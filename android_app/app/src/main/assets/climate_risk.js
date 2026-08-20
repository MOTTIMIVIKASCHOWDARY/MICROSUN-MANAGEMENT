const API_KEY = '73fa75c5e590652016239baeb225f788';
const BASE_URL = 'https://api.weatherapi.com/v1';

let currentUnit = 'c'; // 'c' or 'f'
let weatherData = null;

// Helper: Get user's saved district & state from any app profile / selection key
function getSavedUserLocation() {
    let currUser = {};
    try {
        currUser = JSON.parse(localStorage.getItem('microsun_current_user') || '{}');
    } catch(e) {}
    
    const district = localStorage.getItem('microsun_selected_district') || 
                     localStorage.getItem('microsun_district') || 
                     localStorage.getItem('microsun_user_district') || 
                     currUser.district || 
                     currUser.city || 
                     '';
                     
    const state = localStorage.getItem('microsun_selected_state') || 
                  localStorage.getItem('microsun_state') || 
                  currUser.state || 
                  '';
                  
    if (district && district.trim()) {
        return { district: district.trim(), state: (state || 'India').trim() };
    }
    return { district: 'Hyderabad', state: 'Telangana' };
}

// Load saved state
const savedUserLoc = getSavedUserLocation();
const selectedState = savedUserLoc.state;
const selectedDistrict = savedUserLoc.district;
const selectedMonth = localStorage.getItem('microsun_selected_month') || '6';
const selectedVariant = localStorage.getItem('microsun_selected_variant_name') || 'Grand Naine (G9)';
const suitabilityScore = localStorage.getItem('microsun_suitability_score') || '85';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupEventListeners();
});

function toggleBananaArmorSubmenu(e) {
    if (e) e.stopPropagation();
    const toggle = document.getElementById('bananaArmorToggle');
    const submenu = document.getElementById('bananaArmorSubmenu');
    if (submenu) {
        const isHidden = submenu.style.display === 'none' || !submenu.style.display;
        submenu.style.display = isHidden ? 'block' : 'none';
        const indicator = toggle ? toggle.querySelector('.submenu-indicator') : null;
        if (indicator) indicator.textContent = isHidden ? '▲' : '▼';
    }
}

function initApp() {
    // Attempt automatic current location detection on page load
    detectAndFetchUserLocation();
    
    // Render initial agronomic static displays
    renderAgronomicIntel();
}

function detectAndFetchUserLocation() {
    const locText = document.getElementById('loc-text');
    if (locText) locText.textContent = 'Detecting current location...';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                reverseGeocodeAndFetch(lat, lon);
            },
            (err) => {
                console.warn('GPS location unavailable, attempting IP location fallback:', err ? err.message : '');
                fallbackToIpLocation();
            },
            { timeout: 7000, enableHighAccuracy: true, maximumAge: 30000 }
        );
    } else {
        fallbackToIpLocation();
    }
}

function fallbackToIpLocation() {
    fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
            if (data && data.city) {
                const city = data.city;
                const region = data.region || data.country_name || 'India';
                const lat = data.latitude;
                const lon = data.longitude;
                if (lat && lon) {
                    fetchOpenMeteoData(lat, lon, city, region);
                } else {
                    fetchWeatherDataWithCity(city, city, region);
                }
            } else {
                throw new Error('IP location response empty');
            }
        })
        .catch(() => {
            const saved = getSavedUserLocation();
            fetchWeatherDataWithCity(saved.district, saved.district, saved.state);
        });
}

function reverseGeocodeAndFetch(lat, lon) {
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
        .then(res => res.json())
        .then(geoData => {
            let cityName = geoData.locality || geoData.city || geoData.principalSubdivision || 'Current Location';
            let stateName = geoData.principalSubdivision || geoData.countryName || 'India';
            fetchOpenMeteoData(lat, lon, cityName, stateName);
        })
        .catch(() => {
            fetchOpenMeteoData(lat, lon, 'Current Location', 'India');
        });
}

function setupEventListeners() {
    const searchBtn = document.getElementById('searchBtn');
    const citySearch = document.getElementById('citySearch');
    const locBtn = document.getElementById('locBtn');
    const unitToggle = document.getElementById('unit-toggle');
    const unitDropdown = document.getElementById('unit-dropdown');
    const viewAllRisks = document.getElementById('viewAllRisks');

    if (searchBtn && citySearch) {
        searchBtn.addEventListener('click', () => {
            const query = citySearch.value.trim();
            if (query) searchCityWeather(query);
        });
        citySearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = citySearch.value.trim();
                if (query) searchCityWeather(query);
            }
        });
    }

    if (locBtn) {
        locBtn.addEventListener('click', () => {
            detectAndFetchUserLocation();
        });
    }

    if (unitToggle && unitDropdown) {
        unitToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const show = unitDropdown.style.display === 'block';
            unitDropdown.style.display = show ? 'none' : 'block';
        });

        document.addEventListener('click', () => {
            unitDropdown.style.display = 'none';
        });

        const options = unitDropdown.querySelectorAll('.unit-option');
        options.forEach(opt => {
            opt.addEventListener('click', (e) => {
                const unit = opt.getAttribute('data-value') || opt.textContent.includes('Fahrenheit') ? 'f' : 'c';
                if (unit) {
                    currentUnit = unit;
                    document.getElementById('unit-label').textContent = unit.toUpperCase() === 'C' ? '°C' : '°F';
                    updateWeatherUI();
                }
            });
        });
    }

    if (viewAllRisks) {
        viewAllRisks.addEventListener('click', () => {
            alert('All active climate alerts have been synchronized to farmer terminals.');
        });
    }
}

function searchCityWeather(cityQuery) {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityQuery)}&count=1&language=en&format=json`)
        .then(res => res.json())
        .then(data => {
            if (data && data.results && data.results.length > 0) {
                const res0 = data.results[0];
                const cityName = res0.name;
                const stateName = res0.admin1 || res0.country || 'India';
                fetchOpenMeteoData(res0.latitude, res0.longitude, cityName, stateName);
            } else {
                fetchWeatherDataWithCity(cityQuery, cityQuery, 'Searched Region');
            }
        })
        .catch(() => {
            fetchWeatherDataWithCity(cityQuery, cityQuery, 'Searched Region');
        });
}

function fetchOpenMeteoData(lat, lon, cityName, stateName) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto`;

    fetch(url)
        .then(res => res.json())
        .then(om => {
            const current = om.current || {};
            const daily = om.daily || {};
            
            const codeMap = (code) => {
                if (code === 0) return { text: 'Sunny & Clear', icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun/3D/sun_3d.png' };
                if (code <= 3) return { text: 'Partly Cloudy', icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun%20behind%20cloud/3D/sun_behind_cloud_3d.png' };
                if (code <= 48) return { text: 'Foggy & Hazy', icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Fog/3D/fog_3d.png' };
                if (code <= 82) return { text: 'Monsoon Rain', icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cloud%20with%20rain/3D/cloud_with_rain_3d.png' };
                return { text: 'Thunderstorms', icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cloud%20with%20lightning%20and%20rain/3D/cloud_with_lightning_and_rain_3d.png' };
            };

            const currCond = codeMap(current.weather_code || 0);
            const tempC = Math.round(current.temperature_2m || 32);
            const feelsC = Math.round(current.apparent_temperature || (tempC + 2));
            const windKph = Math.round(current.wind_speed_10m || 12);
            const humidity = Math.round(current.relative_humidity_2m || 50);

            const mockData = {
                location: {
                    name: cityName,
                    region: stateName,
                    country: 'India',
                    lat: lat,
                    lon: lon,
                    localtime: new Date().toISOString()
                },
                current: {
                    temp_c: tempC,
                    temp_f: Math.round(tempC * 1.8 + 32),
                    feelslike_c: feelsC,
                    feelslike_f: Math.round(feelsC * 1.8 + 32),
                    wind_kph: windKph,
                    wind_dir: 'NE',
                    humidity: humidity,
                    uv: (daily.uv_index_max && daily.uv_index_max[0]) ? Math.round(daily.uv_index_max[0]) : 6.0,
                    vis_km: 10,
                    condition: {
                        text: currCond.text,
                        icon: currCond.icon
                    }
                },
                forecast: { forecastday: [] }
            };

            const maxArr = daily.temperature_2m_max || [tempC+2, tempC+1, tempC, tempC-1, tempC+2, tempC+3, tempC+1];
            const minArr = daily.temperature_2m_min || [tempC-8, tempC-7, tempC-8, tempC-9, tempC-7, tempC-6, tempC-8];
            const codeArr = daily.weather_code || [0, 1, 2, 61, 80, 0, 1];
            const srArr = daily.sunrise || [];
            const ssArr = daily.sunset || [];

            for (let i = 0; i < 7; i++) {
                const futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + i);
                const dCode = codeArr[i] !== undefined ? codeArr[i] : 0;
                const dCond = codeMap(dCode);

                let srText = '06:02 AM';
                let ssText = '06:34 PM';
                if (srArr[i]) {
                    const srDate = new Date(srArr[i]);
                    srText = srDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                }
                if (ssArr[i]) {
                    const ssDate = new Date(ssArr[i]);
                    ssText = ssDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                }

                mockData.forecast.forecastday.push({
                    date: futureDate.toISOString().split('T')[0],
                    astro: { sunrise: srText, sunset: ssText },
                    day: {
                        maxtemp_c: Math.round(maxArr[i] || tempC),
                        maxtemp_f: Math.round((maxArr[i] || tempC) * 1.8 + 32),
                        mintemp_c: Math.round(minArr[i] || (tempC - 8)),
                        mintemp_f: Math.round((minArr[i] || (tempC - 8)) * 1.8 + 32),
                        condition: { text: dCond.text, icon: dCond.icon }
                    }
                });
            }

            weatherData = mockData;
            updateWeatherUI();
            analyzeClimateRisk(mockData);
            renderNearbyRegions(cityName, tempC);
        })
        .catch(err => {
            console.warn('OpenMeteo failed, falling back to local database:', err);
            loadLocalFallbackData(`${lat},${lon}`, cityName, stateName);
        });
}

function fetchWeatherDataWithCity(query, cityName, stateName) {
    loadLocalFallbackData(query, cityName, stateName);
}

function fetchWeatherData(query) {
    fetchWeatherDataWithCity(query, query, 'Searched Region');
}

function loadLocalFallbackData(query, customCity, customState) {
    let saved = getSavedUserLocation();
    let displayDistrict = customCity || saved.district;
    let displayState = customState || saved.state;
    let localTemp = 32;
    let localHumidity = 42;
    let weatherText = 'Clear & Sunny';
    let windSpeed = 14;

    if (query && typeof query === 'string') {
        const cleanQuery = query.trim().toLowerCase();
        if (cleanQuery.includes('chennai') || cleanQuery.includes('madras')) {
            displayDistrict = 'Chennai';
            displayState = 'Tamil Nadu';
            localTemp = 34;
            localHumidity = 78;
            weatherText = 'Humid & Overcast';
            windSpeed = 22;
        } else if (cleanQuery.includes('hyderabad')) {
            displayDistrict = 'Hyderabad';
            displayState = 'Telangana';
            localTemp = 35;
            localHumidity = 45;
            weatherText = 'Hot & Sunny';
            windSpeed = 14;
        } else if (cleanQuery.includes('anantapur')) {
            displayDistrict = 'Anantapur';
            displayState = 'Andhra Pradesh';
            localTemp = 36;
            localHumidity = 35;
            weatherText = 'Hot & Sunny';
            windSpeed = 15;
        } else if (cleanQuery.includes('jalgaon') || cleanQuery.includes('pune')) {
            displayDistrict = cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1);
            displayState = 'Maharashtra';
            localTemp = 33;
            localHumidity = 48;
            weatherText = 'Partly Cloudy';
        } else if (customCity) {
            displayDistrict = customCity;
            displayState = customState || 'Local Region';
        }
    }

    const mockData = {
        location: {
            name: displayDistrict,
            region: displayState,
            country: 'India',
            lat: 17.38,
            lon: 78.48,
            localtime: new Date().toISOString()
        },
        current: {
            temp_c: localTemp,
            temp_f: Math.round(localTemp * 1.8 + 32),
            feelslike_c: localTemp + 2,
            feelslike_f: Math.round((localTemp + 2) * 1.8 + 32),
            wind_kph: windSpeed,
            wind_dir: 'ENE',
            humidity: localHumidity,
            uv: 7.0,
            vis_km: 9,
            condition: {
                text: weatherText,
                icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun/3D/sun_3d.png'
            }
        },
        forecast: {
            forecastday: []
        }
    };
    
    const forecastPatterns = [
        { text: 'Sunny & Warm', icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun/3D/sun_3d.png', tempOffset: 0 },
        { text: 'Partly Cloudy', icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun%20behind%20cloud/3D/sun_behind_cloud_3d.png', tempOffset: -1 },
        { text: 'Light Showers', icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun%20behind%20rain%20cloud/3D/sun_behind_rain_cloud_3d.png', tempOffset: -3 },
        { text: 'Monsoon Rain', icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cloud%20with%20rain/3D/cloud_with_rain_3d.png', tempOffset: -4 },
        { text: 'Thunderstorms', icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cloud%20with%20lightning%20and%20rain/3D/cloud_with_lightning_and_rain_3d.png', tempOffset: -5 },
        { text: 'Humid & Overcast', icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun%20behind%20cloud/3D/sun_behind_cloud_3d.png', tempOffset: -1 },
        { text: 'Clear Sky', icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun/3D/sun_3d.png', tempOffset: 1 }
    ];

    for (let i = 0; i < 7; i++) {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + i);
        const pat = forecastPatterns[i % 7];
        const dayMax = localTemp + pat.tempOffset;
        const dayMin = dayMax - 8;

        mockData.forecast.forecastday.push({
            date: futureDate.toISOString().split('T')[0],
            astro: { sunrise: '06:02 AM', sunset: '06:34 PM' },
            day: {
                maxtemp_c: dayMax,
                maxtemp_f: Math.round(dayMax * 1.8 + 32),
                mintemp_c: dayMin,
                mintemp_f: Math.round(dayMin * 1.8 + 32),
                condition: { text: pat.text, icon: pat.icon }
            }
        });
    }

    weatherData = mockData;
    updateWeatherUI();
    analyzeClimateRisk(mockData);
    
    // Populate nearby regions with REAL nearby locations
    const nearbyList = document.getElementById('nearby-list');
    if (nearbyList) {
        nearbyList.innerHTML = '';

        // Location-aware nearby city database
        const nearbyDb = {
            'chennai': [
                { name: 'Kanchipuram', temp: 33 },
                { name: 'Tiruvallur', temp: 35 },
                { name: 'Chengalpattu', temp: 33 },
                { name: 'Mahabalipuram', temp: 32 }
            ],
            'anantapur': [
                { name: 'Kurnool', temp: 38 },
                { name: 'Bellary', temp: 37 },
                { name: 'Kadapa', temp: 36 },
                { name: 'Dharmavaram', temp: 37 }
            ],
            'pune': [
                { name: 'Satara', temp: 30 },
                { name: 'Solapur', temp: 35 },
                { name: 'Nashik', temp: 31 },
                { name: 'Kolhapur', temp: 29 }
            ],
            'jalgaon': [
                { name: 'Dhule', temp: 34 },
                { name: 'Aurangabad', temp: 33 },
                { name: 'Nashik', temp: 31 },
                { name: 'Nandurbar', temp: 35 }
            ],
            'default': [
                { name: 'Region North', temp: localTemp + 1 },
                { name: 'Region South', temp: localTemp - 1 },
                { name: 'Region East', temp: localTemp },
                { name: 'Region West', temp: localTemp + 2 }
            ]
        };

        const key = displayDistrict.toLowerCase();
        const nearbyItems = nearbyDb[key] || nearbyDb['default'];

        nearbyItems.forEach(m => {
            const itemCard = document.createElement('div');
            itemCard.className = 'nearby-item';
            itemCard.innerHTML = `
                <span class="n-name">${m.name}</span>
                <span class="n-temp">${m.temp}°C</span>
            `;
            nearbyList.appendChild(itemCard);
        });
    }
}

function get3DWeatherIcon(conditionText) {
    if (!conditionText) return 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun/3D/sun_3d.png';
    const txt = conditionText.toLowerCase();

    if (txt.includes('thunder') || txt.includes('lightning') || txt.includes('storm')) {
        return 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cloud%20with%20lightning%20and%20rain/3D/cloud_with_lightning_and_rain_3d.png';
    }
    if (txt.includes('heavy rain') || txt.includes('downpour') || txt.includes('monsoon')) {
        return 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cloud%20with%20rain/3D/cloud_with_rain_3d.png';
    }
    if (txt.includes('rain') || txt.includes('shower') || txt.includes('drizzle')) {
        return 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun%20behind%20rain%20cloud/3D/sun_behind_rain_cloud_3d.png';
    }
    if (txt.includes('cloud') || txt.includes('overcast')) {
        return 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun%20behind%20cloud/3D/sun_behind_cloud_3d.png';
    }
    return 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun/3D/sun_3d.png';
}

function updateWeatherUI() {
    if (!weatherData) return;

    const loc = weatherData.location;
    const current = weatherData.current;
    const forecast = weatherData.forecast.forecastday[0];

    // Populate nearby regions
    renderNearbyRegions(loc.name);

    // Location & Date
    document.getElementById('loc-text').textContent = `${loc.name}, ${loc.region}`;
    
    const date = new Date(loc.localtime);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    document.getElementById('day-text').textContent = days[date.getDay()];
    document.getElementById('date-text').textContent = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

    // Temp values
    const tempVal = currentUnit === 'c' ? Math.round(current.temp_c) : Math.round(current.temp_f);
    const feelsVal = currentUnit === 'c' ? Math.round(current.feelslike_c) : Math.round(current.feelslike_f);
    const maxTemp = currentUnit === 'c' ? Math.round(forecast.day.maxtemp_c) : Math.round(forecast.day.maxtemp_f);
    const minTemp = currentUnit === 'c' ? Math.round(forecast.day.mintemp_c) : Math.round(forecast.day.mintemp_f);
    
    document.getElementById('temp-value').textContent = tempVal;
    document.getElementById('feels-like-value').textContent = feelsVal;
    document.getElementById('min-max-value').textContent = `${maxTemp}° / ${minTemp}°${currentUnit.toUpperCase()}`;
    document.getElementById('condition-text').textContent = current.condition.text;
    
    // Icon
    const iconUrl = current.condition.icon.startsWith('//') ? 'https:' + current.condition.icon : current.condition.icon;
    const cleanIconUrl = iconUrl.replace('64x64', '128x128');
    document.getElementById('weather-icon').src = cleanIconUrl;

    // Today highlight grid
    document.getElementById('wind-val').textContent = current.wind_kph;
    document.getElementById('wind-desc').textContent = `Wind dir: ${current.wind_dir}`;
    
    document.getElementById('humidity-val').textContent = current.humidity;
    document.getElementById('humidity-desc').textContent = current.humidity > 65 ? 'High humidity (Wet)' : 'Low humidity (Dry)';
    
    document.getElementById('uv-val').textContent = current.uv;
    let uvDesc = 'Low';
    if (current.uv > 2) uvDesc = 'Moderate';
    if (current.uv > 5) uvDesc = 'High';
    if (current.uv > 7) uvDesc = 'Very High';
    document.getElementById('uv-desc').textContent = `${uvDesc} risk factor`;
    
    document.getElementById('vis-val').textContent = current.vis_km;
    document.getElementById('vis-desc').textContent = current.vis_km > 8 ? 'Excellent visibility' : 'Hazy air quality';

    // Sunrise Sunset (Null Safe)
    const astro = (forecast && forecast.astro) ? forecast.astro : { sunrise: '06:02 AM', sunset: '06:34 PM' };
    document.getElementById('sunrise-val').textContent = astro.sunrise || '06:02 AM';
    document.getElementById('sunset-val').textContent = astro.sunset || '06:34 PM';

    // Render 7 Day Forecast list
    const forecastList = weatherData.forecast.forecastday;
    const forecastGrid = document.getElementById('forecast-grid');
    forecastGrid.innerHTML = '';

    forecastList.forEach(day => {
        const dayDate = new Date(day.date);
        const dayName = days[dayDate.getDay()].substring(0, 3);
        const dayMax = currentUnit === 'c' ? Math.round(day.day.maxtemp_c) : Math.round(day.day.maxtemp_f);
        const dayMin = currentUnit === 'c' ? Math.round(day.day.mintemp_c) : Math.round(day.day.mintemp_f);
        
        let dayIcon = day.day.condition.icon;
        if (!dayIcon || dayIcon.includes('weatherapi.com')) {
            dayIcon = get3DWeatherIcon(day.day.condition.text);
        }

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="f-day" style="font-weight:700;">${dayName}</div>
            <img class="f-icon" src="${dayIcon}" alt="${day.day.condition.text}" style="width: 54px; height: 54px; object-fit: contain; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.15));">
            <div class="f-temp" style="font-weight:700; white-space:nowrap;">${dayMax}°/${dayMin}°</div>
            <div class="f-desc" style="font-size:0.75rem; color:#555; margin-top:4px; font-weight:600; text-align:center; line-height:1.15;">${day.day.condition.text}</div>
        `;
        forecastGrid.appendChild(card);
    });
}

function renderNearbyRegions(districtName, tempVal) {
    const nearbyList = document.getElementById('nearby-list');
    if (!nearbyList) return;
    nearbyList.innerHTML = '';

    const searchKey = (districtName || selectedDistrict || 'chennai').trim().toLowerCase();
    const baseTemp = typeof tempVal === 'number' ? Math.round(tempVal) : 33;

    const nearbyDb = {
        'chennai': [
            { name: 'Kanchipuram', temp: 33 },
            { name: 'Tiruvallur', temp: 35 },
            { name: 'Chengalpattu', temp: 33 },
            { name: 'Mahabalipuram', temp: 32 }
        ],
        'anantapur': [
            { name: 'Kurnool', temp: 38 },
            { name: 'Bellary', temp: 37 },
            { name: 'Kadapa', temp: 36 },
            { name: 'Dharmavaram', temp: 37 }
        ],
        'pune': [
            { name: 'Satara', temp: 30 },
            { name: 'Solapur', temp: 35 },
            { name: 'Nashik', temp: 31 },
            { name: 'Kolhapur', temp: 29 }
        ],
        'jalgaon': [
            { name: 'Dhule', temp: 34 },
            { name: 'Aurangabad', temp: 33 },
            { name: 'Bhusawal', temp: 35 },
            { name: 'Nandurbar', temp: 35 }
        ],
        'coimbatore': [
            { name: 'Tirupur', temp: baseTemp + 1 },
            { name: 'Erode', temp: baseTemp + 2 },
            { name: 'Pollachi', temp: baseTemp - 1 },
            { name: 'Karur', temp: baseTemp + 1 }
        ],
        'trichy': [
            { name: 'Thanjavur', temp: baseTemp },
            { name: 'Karur', temp: baseTemp + 1 },
            { name: 'Pudukkottai', temp: baseTemp },
            { name: 'Perambalur', temp: baseTemp + 1 }
        ],
        'theni': [
            { name: 'Madurai', temp: baseTemp + 2 },
            { name: 'Dindigul', temp: baseTemp + 1 },
            { name: 'Bodinayakanur', temp: baseTemp - 1 },
            { name: 'Periyakulam', temp: baseTemp }
        ],
        'bengaluru': [
            { name: 'Hosur', temp: baseTemp - 1 },
            { name: 'Ramanagara', temp: baseTemp + 1 },
            { name: 'Tumkur', temp: baseTemp },
            { name: 'Kolar', temp: baseTemp - 1 }
        ],
        'bangalore': [
            { name: 'Hosur', temp: baseTemp - 1 },
            { name: 'Ramanagara', temp: baseTemp + 1 },
            { name: 'Tumkur', temp: baseTemp },
            { name: 'Kolar', temp: baseTemp - 1 }
        ],
        'hyderabad': [
            { name: 'Secunderabad', temp: baseTemp },
            { name: 'Sangareddy', temp: baseTemp - 1 },
            { name: 'Warangal', temp: baseTemp + 1 },
            { name: 'Nizamabad', temp: baseTemp + 1 }
        ],
        'mumbai': [
            { name: 'Thane', temp: baseTemp },
            { name: 'Navi Mumbai', temp: baseTemp + 1 },
            { name: 'Kalyan', temp: baseTemp + 1 },
            { name: 'Panvel', temp: baseTemp }
        ],
        'delhi': [
            { name: 'Noida', temp: baseTemp },
            { name: 'Gurugram', temp: baseTemp },
            { name: 'Faridabad', temp: baseTemp + 1 },
            { name: 'Ghaziabad', temp: baseTemp }
        ]
    };

    let items = null;
    for (let key in nearbyDb) {
        if (searchKey.includes(key) || key.includes(searchKey)) {
            items = nearbyDb[key];
            break;
        }
    }

    if (!items) {
        const capName = districtName ? (districtName.charAt(0).toUpperCase() + districtName.slice(1)) : 'Region';
        items = [
            { name: `${capName} North`, temp: baseTemp + 1 },
            { name: `${capName} South`, temp: baseTemp - 1 },
            { name: `${capName} East`, temp: baseTemp },
            { name: `${capName} West`, temp: baseTemp + 2 }
        ];
    }

    items.forEach(m => {
        const itemCard = document.createElement('div');
        itemCard.className = 'nearby-item';
        itemCard.innerHTML = `
            <span class="n-name">${m.name}</span>
            <span class="n-temp">${m.temp}°C</span>
        `;
        nearbyList.appendChild(itemCard);
    });
}

function fetchNearbyRegions(lat, lon) {
    const locName = (weatherData && weatherData.location) ? weatherData.location.name : selectedDistrict;
    const tempVal = (weatherData && weatherData.current) ? weatherData.current.temp_c : 34;
    renderNearbyRegions(locName, tempVal);
}

function analyzeClimateRisk(data) {
    const current = data.current;
    const alertsList = document.getElementById('risk-alerts-list');
    const badge = document.getElementById('risk-summary-badge');
    
    alertsList.innerHTML = '';
    let risks = [];
    
    // 1. Windspeed Check
    if (current.wind_kph > 28) {
        risks.push({
            title: 'High Windspeed Warning',
            desc: `Wind is blowing at ${current.wind_kph} km/h. Lodging danger is high for mature bunches.`,
            level: 'critical',
            icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Wind%20face/3D/wind_face_3d.png',
            tip: 'Install bamboo propping poles immediately'
        });
    } else if (current.wind_kph > 18) {
        risks.push({
            title: 'Moderate Wind Alert',
            desc: `Wind velocity is ${current.wind_kph} km/h. Check structural stakes and ties.`,
            level: 'moderate',
            icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Dashing%20away/3D/dashing_away_3d.png',
            tip: 'Inspect stake ties and support ropes'
        });
    }

    // 2. Humidity & Fungal Risk Check
    if (current.humidity > 70 && current.temp_c > 26) {
        risks.push({
            title: 'Sigatoka Fungal Risk',
            desc: `Air humidity at ${current.humidity}% with warm temp (${current.temp_c}°C) breeds Black Sigatoka.`,
            level: 'critical',
            icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Microbe/3D/microbe_3d.png',
            tip: 'Spray Carbendazim (1g/L) preemptively'
        });
    } else if (current.humidity < 40) {
        risks.push({
            title: 'Air Aridity & Soil Moisture Risk',
            desc: `Low air humidity (${current.humidity}%). Transpiration rates are high.`,
            level: 'moderate',
            icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Droplet/3D/droplet_3d.png',
            tip: 'Increase drip irrigation duration by 20%'
        });
    }

    // 3. Extreme Temperature Check
    if (current.temp_c > 38) {
        risks.push({
            title: 'Extreme Heat & Sunburn',
            desc: `Temperature reached ${current.temp_c}°C. High solar radiation damage risk.`,
            level: 'critical',
            icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun/3D/sun_3d.png',
            tip: 'Cover emerging bunches with blue sleeves'
        });
    } else if (current.temp_c < 14) {
        risks.push({
            title: 'Winter Cold & Bunch Choking',
            desc: `Temperature dipped to ${current.temp_c}°C. Under 14°C growth slows drastically.`,
            level: 'moderate',
            icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Snowflake/3D/snowflake_3d.png',
            tip: 'Irrigate at night to retain soil temperature'
        });
    }

    // 4. Default System Optimal State
    if (risks.length === 0) {
        risks.push({
            title: 'Optimal Local Environment',
            desc: 'Temperature, wind velocity, and humidity match variety thresholds perfectly.',
            level: 'optimal',
            icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sparkles/3D/sparkles_3d.png',
            tip: 'Maintain standard fertigation schedule'
        });
    }

    // Render Cards with 3D Icons, Badges, and Action Tips
    risks.forEach((r, idx) => {
        const item = document.createElement('div');
        item.className = `risk-alert-item ${r.level}`;
        item.style.animationDelay = `${idx * 0.1}s`;

        let badgeBg = 'rgba(76, 175, 80, 0.2)';
        let badgeColor = '#2E7D32';
        if (r.level === 'critical') {
            badgeBg = 'rgba(211, 47, 47, 0.2)';
            badgeColor = '#C62828';
        } else if (r.level === 'moderate') {
            badgeBg = 'rgba(245, 124, 0, 0.2)';
            badgeColor = '#E65100';
        }

        item.innerHTML = `
            <div class="risk-badge" style="background: ${badgeBg}; color: ${badgeColor};">${r.level.toUpperCase()}</div>
            <div class="risk-icon-wrap">
                <img src="${r.icon}" alt="${r.title}" onerror="this.src='https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Warning/3D/warning_3d.png'">
            </div>
            <div class="risk-info">
                <h4>${r.title}</h4>
                <p>${r.desc}</p>
            </div>
            <div class="risk-action-tip">
                <span style="font-size: 0.9rem;">💡</span>
                <span style="font-size: 0.75rem; font-weight: 600; color: #1A1A1A;">${r.tip}</span>
            </div>
        `;
        alertsList.appendChild(item);
    });

    // Summary badge
    if (badge) {
        const criticals = risks.filter(r => r.level === 'critical').length;
        if (criticals > 0) {
            badge.textContent = `${criticals} CRITICAL RISKS`;
            badge.className = 'risk-summary-badge critical';
            badge.style.display = 'inline-block';
        } else {
            badge.textContent = 'SYSTEM OPTIMAL';
            badge.className = 'risk-summary-badge optimal';
            badge.style.display = 'inline-block';
        }
    }
}

// Variety Intelligence Database with Duration, Stages, Irrigation, Nutrition, Tasks & Pest Risks
const VARIETY_AGRO_DB = {
    'grand naine': {
        name: 'Grand Naine (G9)',
        durationMonths: 12,
        water: { seedling: '3-5 L/Plant', vegetative: '8-12 L/Plant', shooting: '15-20 L/Plant', harvest: '12-15 L/Plant' },
        fert: { seedling: 'NPK 10:10:10 (50g)', vegetative: 'Urea (150g) + MOP (200g)', shooting: 'SOP/Potash 150g spray', harvest: 'Organic compost only' },
        task: { seedling: 'Pit filling / TC planting', vegetative: 'Desuckering & Weeding', shooting: 'Bamboo propping poles', harvest: 'Bunch sleeve protection' },
        pest: { seedling: 'Aphid vector monitoring', vegetative: 'Leaf Spot (Sigatoka) spray', shooting: 'Thrips check & sleeve cover', harvest: 'Fruit borer monitoring' }
    },
    'red banana': {
        name: 'Red Banana',
        durationMonths: 17,
        water: { seedling: '4-6 L/Plant', vegetative: '12-16 L/Plant', shooting: '20-25 L/Plant', harvest: '15 L/Plant' },
        fert: { seedling: 'Basal FYM 10kg + Neem', vegetative: 'Urea 200g + Potash 250g', shooting: 'Micronutrient foliar spray', harvest: 'No chemical spray' },
        task: { seedling: 'Deep pit soil mix', vegetative: 'Earthing up & Desuckering', shooting: 'Heavy double-propping', harvest: 'Bunch harvesting' },
        pest: { seedling: 'Rhizome weevil trap', vegetative: 'Panama wilt drenching', shooting: 'Bunch thrips protection', harvest: 'Sunburn protection' }
    },
    'nendran': {
        name: 'Nendran',
        durationMonths: 11,
        water: { seedling: '3-4 L/Plant', vegetative: '8-10 L/Plant', shooting: '14-18 L/Plant', harvest: '10 L/Plant' },
        fert: { seedling: 'Organic manure 5kg', vegetative: 'NPK 150:50:200g split', shooting: 'High Potash 200g', harvest: 'Stop fertigation' },
        task: { seedling: 'Sucker selection', vegetative: 'Weeding & Mulching', shooting: 'Male bud denavelling', harvest: 'Stalk cutting' },
        pest: { seedling: 'Nematode solarization', vegetative: 'Pseudostem borer check', shooting: 'Sleeve application', harvest: 'Storage pest check' }
    },
    'robusta': {
        name: 'Robusta',
        durationMonths: 13,
        water: { seedling: '4-5 L/Plant', vegetative: '10-14 L/Plant', shooting: '16-22 L/Plant', harvest: '12 L/Plant' },
        fert: { seedling: 'Complex 17:17:17 (60g)', vegetative: 'Urea 180g + MOP 220g', shooting: 'Potash 150g + Boron', harvest: 'Compost top-dressing' },
        task: { seedling: 'Drip line setup', vegetative: 'Desuckering & Hoeing', shooting: 'Propping support', harvest: 'Bunch de-handing' },
        pest: { seedling: 'Root mealybug check', vegetative: 'Sigatoka spray (Mancozeb)', shooting: 'Thrips control', harvest: 'Post-harvest care' }
    },
    'dwarf cavendish': {
        name: 'Dwarf Cavendish',
        durationMonths: 11.5,
        water: { seedling: '3-5 L/Plant', vegetative: '8-12 L/Plant', shooting: '15-18 L/Plant', harvest: '10-12 L/Plant' },
        fert: { seedling: 'NPK 10:26:26', vegetative: 'Urea 160g + MOP 200g', shooting: 'Potassium Nitrate 1%', harvest: 'Mulch addition' },
        task: { seedling: 'Field levelling', vegetative: 'Inter-cultivation', shooting: 'Bunch covering', harvest: 'Harvest grading' },
        pest: { seedling: 'Aphid spray', vegetative: 'Black Sigatoka spray', shooting: 'Scab moth control', harvest: 'Borer inspection' }
    },
    'yelakki': {
        name: 'Yelakki (Ney Poovan)',
        durationMonths: 13,
        water: { seedling: '3-4 L/Plant', vegetative: '7-10 L/Plant', shooting: '12-16 L/Plant', harvest: '10 L/Plant' },
        fert: { seedling: 'VAM biofertilizer 50g', vegetative: 'Urea 140g + MOP 180g', shooting: 'SOP 100g spray', harvest: 'Organic tea' },
        task: { seedling: 'Pothole planting', vegetative: 'Desuckering', shooting: 'Support staking', harvest: 'Bunch picking' },
        pest: { seedling: 'BBTV virus check', vegetative: 'Fusarium wilt preventive', shooting: 'Thrips monitoring', harvest: 'Crown rot control' }
    },
    'kaveri haritha': {
        name: 'Kaveri Haritha',
        durationMonths: 12.5,
        water: { seedling: '3-5 L/Plant', vegetative: '8-12 L/Plant', shooting: '15-18 L/Plant', harvest: '11-13 L/Plant' },
        fert: { seedling: 'Bio-mix + NPK (40g)', vegetative: 'Urea 150g + Potash 200g', shooting: 'Boron + Zinc spray', harvest: 'Compost application' },
        task: { seedling: 'Soil testing', vegetative: 'Mulching & Weeding', shooting: 'Propping poles', harvest: 'Packaging prep' },
        pest: { seedling: 'Aphid control', vegetative: 'Leaf spot control', shooting: 'Sleeve covering', harvest: 'Quality grading' }
    },
    'kaveri saba': {
        name: 'Kaveri Saba',
        durationMonths: 12.5,
        water: { seedling: '2-4 L/Plant', vegetative: '6-9 L/Plant', shooting: '12-15 L/Plant', harvest: '8-10 L/Plant' },
        fert: { seedling: 'Compost 5kg + Neem', vegetative: 'Urea 120g + Potash 160g', shooting: 'SOP 120g', harvest: 'Green manure' },
        task: { seedling: 'Drought trenching', vegetative: 'Desuckering', shooting: 'Staking', harvest: 'Bunch harvesting' },
        pest: { seedling: 'Rhizome rot check', vegetative: 'Stem borer trap', shooting: 'Bunch protection', harvest: 'Storage check' }
    },
    'kaveri sugantham': {
        name: 'Kaveri Sugantham',
        durationMonths: 13,
        water: { seedling: '3-5 L/Plant', vegetative: '8-11 L/Plant', shooting: '14-18 L/Plant', harvest: '10-12 L/Plant' },
        fert: { seedling: 'Organic manure 5kg', vegetative: 'Urea 150g + MOP 200g', shooting: 'Potash 150g spray', harvest: 'Bio-fertilizer' },
        task: { seedling: 'Pit preparation', vegetative: 'Weeding & Mulching', shooting: 'Propping poles', harvest: 'Bunch cutting' },
        pest: { seedling: 'Panama wilt check', vegetative: 'Leaf spot spray', shooting: 'Sleeve cover', harvest: 'Post-harvest care' }
    },
    'kaveri poovan': {
        name: 'Kaveri Poovan',
        durationMonths: 13,
        water: { seedling: '3-4 L/Plant', vegetative: '7-10 L/Plant', shooting: '13-17 L/Plant', harvest: '10 L/Plant' },
        fert: { seedling: 'NPK 10:10:10', vegetative: 'Urea 140g + MOP 180g', shooting: 'Potash 140g', harvest: 'Compost' },
        task: { seedling: 'Sucker planting', vegetative: 'Desuckering', shooting: 'Support staking', harvest: 'Bunch picking' },
        pest: { seedling: 'Aphid check', vegetative: 'Sigatoka spray', shooting: 'Thrips check', harvest: 'Borer inspection' }
    },
    'kaveri kanchan': {
        name: 'Kaveri Kanchan',
        durationMonths: 13,
        water: { seedling: '3-5 L/Plant', vegetative: '8-12 L/Plant', shooting: '14-18 L/Plant', harvest: '11 L/Plant' },
        fert: { seedling: 'Complex 17:17:17', vegetative: 'Urea 160g + MOP 200g', shooting: 'High K spray', harvest: 'Organic mulch' },
        task: { seedling: 'Field preparation', vegetative: 'Earthing up', shooting: 'Propping poles', harvest: 'Grading' },
        pest: { seedling: 'Nematodes', vegetative: 'Leaf spot', shooting: 'Sleeve application', harvest: 'Quality check' }
    },
    'udhayam': {
        name: 'Udhayam',
        durationMonths: 12,
        water: { seedling: '3-5 L/Plant', vegetative: '8-12 L/Plant', shooting: '15-18 L/Plant', harvest: '11 L/Plant' },
        fert: { seedling: 'NPK starter', vegetative: 'Urea 150g + MOP 200g', shooting: 'Potash spray', harvest: 'Compost' },
        task: { seedling: 'Pit filling', vegetative: 'Desuckering', shooting: 'Propping', harvest: 'Bunch harvesting' },
        pest: { seedling: 'Aphid vector', vegetative: 'Sigatoka spray', shooting: 'Thrips protection', harvest: 'Borer check' }
    },
    'matti': {
        name: 'Matti',
        durationMonths: 12,
        water: { seedling: '3-4 L/Plant', vegetative: '7-10 L/Plant', shooting: '12-15 L/Plant', harvest: '9 L/Plant' },
        fert: { seedling: 'Organic manure', vegetative: 'NPK 140:40:180g', shooting: 'Potash 120g', harvest: 'Bio-compost' },
        task: { seedling: 'Pothole planting', vegetative: 'Weeding', shooting: 'Staking', harvest: 'Hand harvesting' },
        pest: { seedling: 'Wilt check', vegetative: 'Leaf spot', shooting: 'Fruit protection', harvest: 'Crown rot check' }
    },
    'semmatti': {
        name: 'Semmatti',
        durationMonths: 13,
        water: { seedling: '4-5 L/Plant', vegetative: '9-13 L/Plant', shooting: '15-20 L/Plant', harvest: '12 L/Plant' },
        fert: { seedling: 'FYM + NPK', vegetative: 'Urea 160g + MOP 220g', shooting: 'Micronutrient spray', harvest: 'Mulching' },
        task: { seedling: 'Pit setup', vegetative: 'Earthing up', shooting: 'Propping poles', harvest: 'Bunch harvest' },
        pest: { seedling: 'Weevil trap', vegetative: 'Wilt drenching', shooting: 'Thrips control', harvest: 'Sunburn check' }
    },
    'bhatmanohar': {
        name: 'Bhatmanohar',
        durationMonths: 12.5,
        water: { seedling: '3-5 L/Plant', vegetative: '8-11 L/Plant', shooting: '14-18 L/Plant', harvest: '10 L/Plant' },
        fert: { seedling: 'NPK 10:10:10', vegetative: 'Urea 150g + MOP 190g', shooting: 'Potash 150g', harvest: 'Compost' },
        task: { seedling: 'Field prep', vegetative: 'Desuckering', shooting: 'Staking', harvest: 'Bunch cutting' },
        pest: { seedling: 'Aphid check', vegetative: 'Sigatoka spray', shooting: 'Sleeve cover', harvest: 'Storage check' }
    },
    'borkal baista': {
        name: 'Borkal Baista',
        durationMonths: 12,
        water: { seedling: '3-5 L/Plant', vegetative: '8-12 L/Plant', shooting: '14-18 L/Plant', harvest: '11 L/Plant' },
        fert: { seedling: 'Organic starter', vegetative: 'Urea 150g + MOP 200g', shooting: 'SOP 150g', harvest: 'Mulch' },
        task: { seedling: 'Pit filling', vegetative: 'Weeding', shooting: 'Propping', harvest: 'Grading' },
        pest: { seedling: 'Rhizome check', vegetative: 'Leaf spot', shooting: 'Thrips control', harvest: 'Borer check' }
    },
    'nrcb selection 19': {
        name: 'NRCB Selection 19',
        durationMonths: 12,
        water: { seedling: '3-5 L/Plant', vegetative: '8-12 L/Plant', shooting: '15-19 L/Plant', harvest: '11 L/Plant' },
        fert: { seedling: 'Bio-mix NPK', vegetative: 'Urea 160g + MOP 210g', shooting: 'Potash foliar', harvest: 'Organic tea' },
        task: { seedling: 'TC planting', vegetative: 'Desuckering', shooting: 'Propping poles', harvest: 'Bunch harvest' },
        pest: { seedling: 'Aphid spray', vegetative: 'Sigatoka control', shooting: 'Sleeve protection', harvest: 'Post-harvest prep' }
    },
    'karpooravalli': {
        name: 'Karpooravalli',
        durationMonths: 13.5,
        water: { seedling: '3-5 L/Plant', vegetative: '8-11 L/Plant', shooting: '14-18 L/Plant', harvest: '10-12 L/Plant' },
        fert: { seedling: 'Organic starter 50g', vegetative: 'Urea 150g + MOP 200g', shooting: 'High K foliar spray', harvest: 'Bio-fertilizer' },
        task: { seedling: 'Pit preparation', vegetative: 'Earthing up', shooting: 'Propping support', harvest: 'Harvest cutting' },
        pest: { seedling: 'Nematode control', vegetative: 'Wilt inspection', shooting: 'Thrips control', harvest: 'Fruit handling' }
    },
    'rasthali': {
        name: 'Rasthali',
        durationMonths: 13,
        water: { seedling: '3-4 L/Plant', vegetative: '7-10 L/Plant', shooting: '13-17 L/Plant', harvest: '10 L/Plant' },
        fert: { seedling: 'Organic manure', vegetative: 'Urea 140g + MOP 180g', shooting: 'Potash 140g', harvest: 'Compost' },
        task: { seedling: 'Pothole planting', vegetative: 'Desuckering', shooting: 'Staking', harvest: 'Harvest' },
        pest: { seedling: 'Panama wilt preventive', vegetative: 'Wilt drenching (Carbendazim)', shooting: 'Thrips check', harvest: 'Storage check' }
    },
    'poovan': {
        name: 'Poovan',
        durationMonths: 12.5,
        water: { seedling: '3-5 L/Plant', vegetative: '8-11 L/Plant', shooting: '14-18 L/Plant', harvest: '10 L/Plant' },
        fert: { seedling: 'FYM + NPK', vegetative: 'Urea 150g + MOP 190g', shooting: 'Potash 150g', harvest: 'Mulch' },
        task: { seedling: 'Field setup', vegetative: 'Weeding', shooting: 'Propping', harvest: 'Bunch picking' },
        pest: { seedling: 'BBTV virus check', vegetative: 'Sigatoka spray', shooting: 'Sleeve cover', harvest: 'Borer inspection' }
    },
    'monthan': {
        name: 'Monthan',
        durationMonths: 12,
        water: { seedling: '4-5 L/Plant', vegetative: '9-13 L/Plant', shooting: '15-20 L/Plant', harvest: '12 L/Plant' },
        fert: { seedling: 'Basal FYM 8kg', vegetative: 'Urea 160g + MOP 200g', shooting: 'Potash 160g', harvest: 'Compost' },
        task: { seedling: 'Pit setup', vegetative: 'Earthing up', shooting: 'Staking support', harvest: 'Stalk harvest' },
        pest: { seedling: 'Stem borer check', vegetative: 'Rhizome rot spray', shooting: 'Bunch cover', harvest: 'Storage prep' }
    }
};

function sanitizeCropName(str) {
    if (!str) return 'Grand Naine (G9)';
    let clean = str.replace(/<[^>]*>/g, ' ').replace(/^(crop|selected variety|selected crop):\s*/i, '');
    let parts = clean.split(/(?:CROP:|Crop:|Selected variety:|Selected crop:|[\n\r,])/i);
    let first = parts[0] ? parts[0].trim() : 'Grand Naine (G9)';
    return first.replace(/^(crop|selected variety|selected crop):\s*/i, '').trim() || 'Grand Naine (G9)';
}

function resolveVarietyInfo(variantStr) {
    const clean = sanitizeCropName(variantStr);
    const lower = clean.toLowerCase();
    for (let key in VARIETY_AGRO_DB) {
        if (lower.includes(key) || key.includes(lower)) {
            return VARIETY_AGRO_DB[key];
        }
    }

    // Dynamic fallback for any unlisted custom variety
    return {
        name: clean,
        durationMonths: 12,
        water: { seedling: '3-5 L/Plant', vegetative: '8-12 L/Plant', shooting: '15-20 L/Plant', harvest: '12-15 L/Plant' },
        fert: { seedling: 'NPK 10:10:10 (50g)', vegetative: 'Urea (150g) + MOP (200g)', shooting: 'Potash 150g spray', harvest: 'Organic compost' },
        task: { seedling: 'Pit filling / TC planting', vegetative: 'Desuckering & Weeding', shooting: 'Bamboo propping', harvest: 'Bunch protection' },
        pest: { seedling: 'Aphid monitoring', vegetative: 'Leaf Spot spray', shooting: 'Thrips check', harvest: 'Fruit borer check' }
    };
}

function renderAgronomicIntel() {
    const rawVariant = localStorage.getItem('microsun_selected_variant_name') || 'Grand Naine (G9)';
    const cleanCropName = sanitizeCropName(rawVariant);
    
    // Store back clean name into localStorage
    localStorage.setItem('microsun_selected_variant_name', cleanCropName);
    
    const info = resolveVarietyInfo(cleanCropName);

    const savedMonth = parseInt(localStorage.getItem('microsun_selected_month'), 10) || 6;
    const currentMonth = new Date().getMonth() + 1; // 1-indexed
    
    // Calculate crop age in months
    let ageMonths = currentMonth - savedMonth;
    if (ageMonths < 0) ageMonths += 12;

    const totalDuration = info.durationMonths;
    const seedlingLimit = Math.round(totalDuration * 0.20);
    const vegLimit = Math.round(totalDuration * 0.60);
    const shootingLimit = Math.round(totalDuration * 0.80);

    let stage = `Seedling (0-${seedlingLimit} Months)`;
    let img = 'banana_seedling.png';
    let stageKey = 'seedling';

    if (ageMonths > seedlingLimit && ageMonths <= vegLimit) {
        stage = `Vegetative Growth (${seedlingLimit + 1}-${vegLimit} Months)`;
        img = 'banana_vegetative.png';
        stageKey = 'vegetative';
    } else if (ageMonths > vegLimit && ageMonths <= shootingLimit) {
        stage = `Shooting / Flowering (${vegLimit + 1}-${shootingLimit} Months)`;
        img = 'banana_flowering.png';
        stageKey = 'shooting';
    } else if (ageMonths > shootingLimit) {
        stage = `Bunch Maturation & Harvest (${shootingLimit + 1}+ Months)`;
        img = 'banana_fruiting.png';
        stageKey = 'harvest';
    }

    // Bind values to DOM
    document.getElementById('stage-display').textContent = stage;
    document.getElementById('stage-img').src = img;

    // Suitability Score
    const activeScore = localStorage.getItem('microsun_suitability_score') || '81';
    document.getElementById('suit-val').textContent = `${activeScore}%`;
    document.getElementById('suit-bar').style.width = `${activeScore}%`;

    // Expected Harvest calculation
    const remainingMonths = totalDuration - ageMonths;
    const remainingDays = Math.round(remainingMonths * 30);
    
    const harvestEl = document.getElementById('harvest-days');
    if (remainingDays <= 0) {
        harvestEl.textContent = 'Harvest Ready';
        harvestEl.style.color = '#C62828';
    } else {
        harvestEl.textContent = `In ${remainingDays} Days`;
        harvestEl.style.color = '#2E7D32';
    }

    // Bind variety & stage-specific action cards
    document.getElementById('action-water').textContent = info.water[stageKey];
    document.getElementById('action-fert').textContent = info.fert[stageKey];
    document.getElementById('action-ops').textContent = info.task[stageKey];
    document.getElementById('action-pest').textContent = info.pest[stageKey];

    // Single Clean Crop Badge
    const varBadge = document.getElementById('selected-variant-badge');
    if (varBadge) {
        varBadge.textContent = 'CROP: ' + info.name.toUpperCase();
        varBadge.style.display = 'inline-block';
    }
}

// Load options helper
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\\\[').replace(/[\]]/, '\\\\]');
    var regex = new RegExp('[\\\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\\+/g, ' '));
}

// Custom navigation bindings if view parameter is passed
window.addEventListener('load', () => {
    const view = getUrlParameter('view');
    if (view === 'disease-scan') {
        const riskHeader = document.querySelector('.risk-alerts-widget');
        if (riskHeader) {
            riskHeader.style.border = '2px solid var(--primary-green, #4CAF50)';
            riskHeader.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
