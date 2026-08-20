// RENTROX AI - Machinery & Farm Labor Rental Engine

let currentRentingTab = 'equipment';
let activeCategoryFilter = 'all';
let currentSearchQuery = '';
let isAdminMode = false;

// Master Machinery Database
const MACHINERY_DB = [
    {
        id: 'm1',
        name: 'John Deere 5050D Tractor',
        category: 'tillage',
        categoryName: 'Tillage & Land Prep',
        hp: '50 HP',
        rate: 450,
        unit: 'hr',
        owner: 'Ramesh Patel',
        phone: '9876543210',
        distance: '2.5 km',
        image: 'john_deere_tractor.png',
        badge: 'Top Rated',
        desc: '50 HP Heavy-duty 4WD tractor for deep ploughing & rotavation.'
    },
    {
        id: 'm2',
        name: 'Multi-Speed Heavy Rotavator',
        category: 'tillage',
        categoryName: 'Tillage & Land Prep',
        hp: '42 HP Required',
        rate: 350,
        unit: 'hr',
        owner: 'Suresh Kumar',
        phone: '9812345678',
        distance: '3.1 km',
        image: 'rotavator_tiller.png',
        badge: 'Available',
        desc: 'Fine seedbed preparation and organic trash mixing.'
    },
    {
        id: 'm3',
        name: 'Agricultural Drone Sprayer',
        category: 'care',
        categoryName: 'Crop Care & Spraying',
        hp: '16L Capacity',
        rate: 550,
        unit: 'acre',
        owner: 'AgriTech Drone Services',
        phone: '9765432109',
        distance: '4.0 km',
        image: 'agricultural_drone.png',
        badge: 'AI Precision',
        desc: 'Precision foliar spray for Sigatoka & pest management in 10 mins.'
    },
    {
        id: 'm4',
        name: 'Heavy Duty 3-Bottom Disc Plough',
        category: 'tillage',
        categoryName: 'Tillage & Land Prep',
        hp: '45 HP',
        rate: 300,
        unit: 'hr',
        owner: 'Venkat Rao',
        phone: '9988776655',
        distance: '1.8 km',
        image: 'disc_plough.png',
        badge: 'Verified',
        desc: 'Ideal for breaking hardpan soil and deep trenching.'
    },
    {
        id: 'm5',
        name: 'Power Weeder & Inter-Cultivator',
        category: 'care',
        categoryName: 'Crop Care & Spraying',
        hp: '7 HP Petrol',
        rate: 200,
        unit: 'hr',
        owner: 'Murugan Farmers Club',
        phone: '9840123456',
        distance: '1.2 km',
        image: 'power_weeder.png',
        badge: 'Easy Move',
        desc: 'Compact inter-crop weeding for banana rows and orchard beds.'
    },
    {
        id: 'm6',
        name: 'High-Capacity Combined Harvester',
        category: 'harvesting',
        categoryName: 'Harvesting & Processing',
        hp: '101 HP',
        rate: 1200,
        unit: 'hr',
        owner: 'Kisan Custom Hiring Hub',
        phone: '9443322110',
        distance: '6.5 km',
        image: 'combined_harvester.png',
        badge: 'Heavy Duty',
        desc: 'Rapid harvesting, threshing & cleaning in single pass.'
    },
    {
        id: 'm7',
        name: 'Precision Laser Land Leveler',
        category: 'tillage',
        categoryName: 'Tillage & Land Prep',
        hp: '55 HP Dual Transmitter',
        rate: 500,
        unit: 'hr',
        owner: 'GreenField Machinery',
        phone: '9123456780',
        distance: '5.0 km',
        image: 'laser_leveler.png',
        badge: 'Water Saver',
        desc: 'Reduces irrigation water loss by 30% through zero-leveling.'
    },
    {
        id: 'm8',
        name: '3 HP Electric Chaff Cutter & Fodder Mill',
        category: 'harvesting',
        categoryName: 'Harvesting & Processing',
        hp: '3 HP Electric',
        rate: 150,
        unit: 'hr',
        owner: 'Balaji Agri Rentals',
        phone: '9554433221',
        distance: '0.8 km',
        image: 'chaff_cutter.png',
        badge: 'Eco Mill',
        desc: 'Chops crop residues, banana pseudostems & livestock fodder.'
    },
    {
        id: 'm9',
        name: 'High-Pressure 5HP Irrigation Diesel Pump',
        category: 'care',
        categoryName: 'Crop Care & Spraying',
        hp: '5 HP Diesel',
        rate: 120,
        unit: 'hr',
        owner: 'Anand Kumar',
        phone: '9665544332',
        distance: '2.0 km',
        image: 'irrigation_pump.png',
        badge: 'Portable',
        desc: 'High head water pumping from farm ponds, wells & canals.'
    }
];

// Master Certified Labor Database
const MANPOWER_DB = [
    {
        id: 'w1',
        name: 'Banana Desuckering & Earthing Crew',
        size: '4 Skilled Workers',
        rate: 1200,
        unit: 'day',
        leader: 'Kaliappan & Team',
        phone: '9845011223',
        distance: '1.5 km',
        image: 'maintenance_crew.png',
        specialty: 'Desuckering, earthing up & propping support',
        badge: 'Certified'
    },
    {
        id: 'w2',
        name: 'Foliar Spraying & Pest Care Operators',
        size: '2 Licensed Operators',
        rate: 800,
        unit: 'day',
        leader: 'Selvam Agro Care',
        phone: '9789012345',
        distance: '2.2 km',
        image: 'spraying_crew.png',
        specialty: 'Knapsack & power spray application for Sigatoka & Wilt',
        badge: 'Safety Trained'
    },
    {
        id: 'w3',
        name: 'Bunch Harvesting & Loading Team',
        size: '6 Workers',
        rate: 1800,
        unit: 'day',
        leader: 'Muthu Harvesting Crew',
        phone: '9632145780',
        distance: '3.0 km',
        image: 'harvesting_crew.png',
        specialty: 'Bunch cutting, de-handing, sleeve bagging & truck loading',
        badge: 'Expert'
    },
    {
        id: 'w4',
        name: 'Land Preparation & Trench Planting Crew',
        size: '3 Workers',
        rate: 900,
        unit: 'day',
        leader: 'Govindappa Labor Group',
        phone: '9512347890',
        distance: '1.8 km',
        image: 'planting_crew.png',
        specialty: 'Pit digging, organic basal manure mixing & TC sucker planting',
        badge: 'Local'
    }
];

let currentListingType = 'machine';

document.addEventListener('DOMContentLoaded', () => {
    initRentingApp();
    setupRentingEventListeners();
});

function initRentingApp() {
    loadUserListings();
    renderRentalAIAdvisor();
    renderRentingGrid();
    renderLaborGrid();
    populateCategoryDropdown('machine');
}

function loadUserListings() {
    try {
        const savedMachines = localStorage.getItem('microsun_user_machines');
        if (savedMachines) {
            const parsed = JSON.parse(savedMachines);
            parsed.forEach(m => {
                if (!MACHINERY_DB.some(item => item.id === m.id)) {
                    MACHINERY_DB.unshift(m);
                }
            });
        }
        const savedWorkers = localStorage.getItem('microsun_user_workers');
        if (savedWorkers) {
            const parsed = JSON.parse(savedWorkers);
            parsed.forEach(w => {
                if (!MANPOWER_DB.some(item => item.id === w.id)) {
                    MANPOWER_DB.unshift(w);
                }
            });
        }
    } catch(e) {}
}

function saveUserListings() {
    try {
        const customMachines = MACHINERY_DB.filter(m => m.id.startsWith('user_m_'));
        const customWorkers = MANPOWER_DB.filter(w => w.id.startsWith('user_w_'));
        localStorage.setItem('microsun_user_machines', JSON.stringify(customMachines));
        localStorage.setItem('microsun_user_workers', JSON.stringify(customWorkers));
    } catch(e) {}
}

function setupRentingEventListeners() {
    // Rate unit toggle buttons in listing form
    const rateBtns = document.querySelectorAll('#rate-unit-toggle-container .rate-unit-btn');
    rateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            rateBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const unit = btn.getAttribute('data-unit');
            const selectEl = document.getElementById('lst-rate-unit');
            if (selectEl) selectEl.value = unit;
        });
    });
}

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

function switchRentingTab(tab) {
    currentRentingTab = tab;

    // Toggle button styles
    const btnEquip = document.getElementById('btn-tab-equipment');
    const btnList = document.getElementById('btn-tab-list');
    const btnManpower = document.getElementById('btn-tab-manpower');

    if (btnEquip) btnEquip.classList.toggle('active', tab === 'equipment');
    if (btnList) btnList.classList.toggle('active', tab === 'list');
    if (btnManpower) btnManpower.classList.toggle('active', tab === 'manpower');

    // Toggle views
    const viewEquip = document.getElementById('equipment-view');
    const viewList = document.getElementById('list-machine-view');
    const viewManpower = document.getElementById('manpower-view');
    const filterContainer = document.getElementById('equip-filters');

    if (viewEquip) viewEquip.classList.toggle('active', tab === 'equipment');
    if (viewList) viewList.classList.toggle('active', tab === 'list');
    if (viewManpower) viewManpower.classList.toggle('active', tab === 'manpower');
    if (filterContainer) filterContainer.style.display = tab === 'equipment' ? 'flex' : 'none';

    if (tab === 'equipment') renderRentingGrid();
    if (tab === 'manpower') renderLaborGrid();
}

function filterCategory(cat) {
    activeCategoryFilter = cat;
    const filterBtns = document.querySelectorAll('#equip-filters .filter-pill');
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${cat}'`));
    });
    renderRentingGrid();
}

function handleSearchInput(query) {
    currentSearchQuery = (query || '').toLowerCase().trim();
    if (currentRentingTab === 'equipment') {
        renderRentingGrid();
    } else if (currentRentingTab === 'manpower') {
        renderLaborGrid();
    }
}

const VARIETY_RENTAL_DB = {
    'red banana': {
        seedling: 'Recommended <strong>Laser Land Leveler</strong> & <strong>Deep Disc Trenching Machine</strong> for high-ridge red soil prep.',
        vegetative: 'Recommended <strong>Agricultural Drone Sprayer</strong> (Micro-nutrients) & <strong>Power Cultivator</strong> for tall stem care.',
        shooting: 'Recommended <strong>High-Pressure Drip Pump</strong> & <strong>Heavy Bamboo Propping Support Crew</strong>.',
        harvest: 'Recommended <strong>Padded Bunch Transport Crew</strong> & <strong>Cushioned Cargo Truck</strong> to prevent red skin bruising.'
    },
    'grand naine': {
        seedling: 'Recommended <strong>Rotavator Tiller</strong> & <strong>Pothole Digger</strong> for tissue-culture pit preparation.',
        vegetative: 'Recommended <strong>Precision Drone Sprayer</strong> & <strong>Power Weeder</strong> for 40% labor & weed management saving.',
        shooting: 'Recommended <strong>Bunch Sleeving Labor Crew</strong> & <strong>Potash Foliar Sprayer</strong> for uniform bunch length.',
        harvest: 'Recommended <strong>De-handing Crew</strong> & <strong>Cold Storage Transport Van</strong> for high-yield harvest.'
    },
    'yelakki': {
        seedling: 'Recommended <strong>Tractor Disc Harrow</strong> & <strong>Organic Compost Spreader</strong> for close-spacing bed prep.',
        vegetative: 'Recommended <strong>Motorized Knapsack Sprayer</strong> & <strong>Inter-Row Rotary Cultivator</strong>.',
        shooting: 'Recommended <strong>Eucalyptus Propping Poles</strong> & <strong>Sub-surface Drip Fertigation Pump</strong>.',
        harvest: 'Recommended <strong>Hand Bunch Cutting Crew</strong> & <strong>Banana Stalk Shredder</strong> for organic mulching.'
    },
    'nendran': {
        seedling: 'Recommended <strong>Heavy Ridge Maker</strong> & <strong>Furrow Plough</strong> for high-mound planting.',
        vegetative: 'Recommended <strong>High-Volume Boom Sprayer</strong> & <strong>Earthing-Up Disc Machine</strong>.',
        shooting: 'Recommended <strong>Heavy Cable Propping Crew</strong> & <strong>Pseudostem Injection Machine</strong> for borer prevention.',
        harvest: 'Recommended <strong>Chips-Grade Bunch Harvesting Crew</strong> & <strong>Field Hydraulic Loader</strong>.'
    },
    'poovan': {
        seedling: 'Recommended <strong>Tractor Rotavator</strong> & <strong>Bio-Fertilizer Drenching Pump</strong>.',
        vegetative: 'Recommended <strong>Power Weeder</strong> & <strong>Biological Trichoderma Spray Drone</strong>.',
        shooting: 'Recommended <strong>Double-Pole Propping Crew</strong> & <strong>Micronutrient Foliar Drier</strong>.',
        harvest: 'Recommended <strong>Local Market Transport Crew</strong> & <strong>Pseudostem Cutter</strong>.'
    },
    'rasthali': {
        seedling: 'Recommended <strong>Deep Soil Subsoiler</strong> & <strong>Carbendazim Trench Drenching Unit</strong> for Panama wilt prevention.',
        vegetative: 'Recommended <strong>Organic Compost Spreader</strong> & <strong>Micro-Sprinkler Irrigation Pump</strong>.',
        shooting: 'Recommended <strong>Propping Support Crew</strong> & <strong>Sigatoka Protection Drone</strong>.',
        harvest: 'Recommended <strong>Delicate Bunch Handling Crew</strong> & <strong>Cushioned Transport Crate System</strong>.'
    },
    'karpooravalli': {
        seedling: 'Recommended <strong>Tractor Bed Former</strong> & <strong>Basal FYM Mixing Loader</strong>.',
        vegetative: 'Recommended <strong>Drought-Resistant Drip Irrigation Pump</strong> & <strong>Rotary Weeder</strong>.',
        shooting: 'Recommended <strong>Wind-Break Netting Crew</strong> & <strong>Potash Spray Drone</strong>.',
        harvest: 'Recommended <strong>Bulk Harvest Crew</strong> & <strong>Field Residue Shredder</strong>.'
    },
    'kaveri kanya': {
        seedling: 'Recommended <strong>Laser Land Leveler</strong> & <strong>Trench Digger</strong> for high-density planting.',
        vegetative: 'Recommended <strong>Ultrasound Foliar Drone Sprayer</strong> & <strong>Power Cultivator</strong> for rapid canopy growth.',
        shooting: 'Recommended <strong>High-Density Cable Wire Propping Crew</strong> & <strong>Bunch Cover Applicator</strong>.',
        harvest: 'Recommended <strong>Export-Quality Bunch Grading Crew</strong> & <strong>Refrigerated Transport Van</strong>.'
    }
};

function sanitizeCropName(str) {
    if (!str) return 'Grand Naine (G9)';
    let clean = str.replace(/<[^>]*>/g, ' ').replace(/^(crop|selected variety|selected crop):\s*/i, '');
    let parts = clean.split(/(?:CROP:|Crop:|Selected variety:|Selected crop:|[\n\r,])/i);
    let first = parts[0] ? parts[0].trim() : 'Grand Naine (G9)';
    return first.replace(/^(crop|selected variety|selected crop):\s*/i, '').trim() || 'Grand Naine (G9)';
}

function renderRentalAIAdvisor() {
    const advisorCard = document.getElementById('rental-ai-advisor');
    if (!advisorCard) return;

    const rawCrop = localStorage.getItem('microsun_selected_variant_name') || 'Grand Naine (G9)';
    const cleanCrop = sanitizeCropName(rawCrop);
    const lowerCrop = cleanCrop.toLowerCase();
    const selectedMonth = parseInt(localStorage.getItem('microsun_selected_month') || '4', 10);

    let stageKey = 'vegetative';
    let stageName = 'Vegetative Growth';

    if (selectedMonth <= 2) {
        stageKey = 'seedling';
        stageName = 'Seedling & Land Prep';
    } else if (selectedMonth >= 3 && selectedMonth <= 7) {
        stageKey = 'vegetative';
        stageName = 'Vegetative Growth';
    } else if (selectedMonth >= 8 && selectedMonth <= 10) {
        stageKey = 'shooting';
        stageName = 'Flowering & Shooting';
    } else {
        stageKey = 'harvest';
        stageName = 'Fruiting & Harvest';
    }

    // Variety-specific lookup
    let matchedData = null;
    for (let key in VARIETY_RENTAL_DB) {
        if (lowerCrop.includes(key) || key.includes(lowerCrop)) {
            matchedData = VARIETY_RENTAL_DB[key];
            break;
        }
    }

    let recText = '';
    if (matchedData && matchedData[stageKey]) {
        recText = matchedData[stageKey];
    } else {
        if (stageKey === 'seedling') recText = 'Recommended <strong>Laser Land Leveler</strong> & <strong>Disc Plough</strong> for 35% soil prep efficiency.';
        else if (stageKey === 'vegetative') recText = 'Recommended <strong>Drone Sprayer</strong> (Foliar Care) & <strong>Power Weeder</strong> for 40% labor saving.';
        else if (stageKey === 'shooting') recText = 'Recommended <strong>High-Pressure Irrigation Pump</strong> & <strong>Propping Labor Crew</strong> for bunch support.';
        else recText = 'Recommended <strong>Combined Harvester</strong> & <strong>Bunch Harvesting Crew</strong> for rapid 1-day harvest.';
    }

    advisorCard.innerHTML = `
        <div style="background: rgba(255, 248, 225, 0.9); border: 2px solid rgba(251, 192, 45, 0.6); padding: 12px 20px; border-radius: 16px; margin: 0 auto 20px auto; max-width: 780px; color: #000000; box-shadow: 0 4px 15px rgba(0,0,0,0.04); text-align: center;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 6px;">
                <img src="cool_banana_transparent.png" alt="Banana AI" style="width: 32px; height: 32px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(251,192,45,0.4));" onerror="this.onerror=null; this.src='banana_character.png';">
                <span style="font-weight: 800; font-size: 1.15rem; color: #1A1A1A; letter-spacing: 0.5px; text-transform: uppercase;">RENTROX AI SMART RECOMMENDATION</span>
            </div>
            <div style="font-size: 1.05rem; color: #222222; font-weight: 600; line-height: 1.4;">
                <strong>${cleanCrop}</strong> in <strong>${stageName} Stage</strong>: ${recText}
            </div>
        </div>
    `;
}

function renderRentingGrid() {
    const grid = document.getElementById('equip-grid');
    if (!grid) return;
    grid.innerHTML = '';

    let items = MACHINERY_DB.filter(item => {
        const matchesCat = activeCategoryFilter === 'all' || item.category === activeCategoryFilter;
        const matchesSearch = !currentSearchQuery || 
            item.name.toLowerCase().includes(currentSearchQuery) || 
            item.desc.toLowerCase().includes(currentSearchQuery) ||
            item.owner.toLowerCase().includes(currentSearchQuery);
        return matchesCat && matchesSearch;
    });

    if (items.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666; font-size: 1.1rem;">No machinery found matching your filter criteria.</div>`;
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'renting-card-item glass';
        card.innerHTML = `
            <div class="card-badge">${item.badge}</div>
            <div class="card-img-holder">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Tractor/3D/tractor_3d.png'">
            </div>
            <div class="card-details">
                <h4 class="item-title">${item.name}</h4>
                <div class="item-meta">
                    <span class="hp-tag">⚡ ${item.hp}</span>
                    <span class="dist-tag">📍 ${item.distance}</span>
                </div>
                <p class="item-desc">${item.desc}</p>
                <div class="owner-info">
                    <span>👤 ${item.owner} • 📞 ${item.phone}</span>
                </div>
                <div class="card-footer-row">
                    <div class="rate-price">₹${item.rate} <span class="rate-unit">/${item.unit}</span></div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderLaborGrid() {
    const grid = document.getElementById('labor-grid');
    if (!grid) return;
    grid.innerHTML = '';

    let items = MANPOWER_DB.filter(item => {
        return !currentSearchQuery || 
            item.name.toLowerCase().includes(currentSearchQuery) || 
            item.specialty.toLowerCase().includes(currentSearchQuery) ||
            item.leader.toLowerCase().includes(currentSearchQuery);
    });

    if (items.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666; font-size: 1.1rem;">No worker teams found matching your search.</div>`;
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'renting-card-item glass';
        card.innerHTML = `
            <div class="card-badge" style="background: #2E7D32;">${item.badge}</div>
            <div class="card-img-holder">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Busts%20in%20silhouette/3D/busts_in_silhouette_3d.png'">
            </div>
            <div class="card-details">
                <h4 class="item-title">${item.name}</h4>
                <div class="item-meta">
                    <span class="hp-tag">👥 ${item.size}</span>
                    <span class="dist-tag">📍 ${item.distance}</span>
                </div>
                <p class="item-desc">${item.specialty}</p>
                <div class="owner-info">
                    <span>👨‍🌾 ${item.leader} • 📞 ${item.phone}</span>
                </div>
                <div class="card-footer-row">
                    <div class="rate-price">₹${item.rate} <span class="rate-unit">/${item.unit}</span></div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function openBookingModal(itemId, type) {
    const modal = document.getElementById('bookingModal');
    if (!modal) return;

    let item = null;
    if (type === 'machine') {
        item = MACHINERY_DB.find(m => m.id === itemId);
    } else {
        item = MANPOWER_DB.find(w => w.id === itemId);
    }

    if (!item) return;

    document.getElementById('modal-title').textContent = item.name;
    document.getElementById('modal-owner-info').textContent = `Provided by ${item.owner || item.leader} • 📞 ${item.phone} (${item.distance})`;
    document.getElementById('modal-img').src = item.image;
    document.getElementById('modal-item-id').value = item.id;
    document.getElementById('modal-item-type').value = type;
    document.getElementById('modal-item-rate').value = item.rate;

    const labelDur = document.getElementById('lbl-duration-unit');
    if (labelDur) {
        labelDur.textContent = item.unit === 'day' ? 'Duration (Days)' : (item.unit === 'acre' ? 'Field Area (Acres)' : 'Duration (Hours)');
    }

    // Default Date to Tomorrow
    const tmrw = new Date();
    tmrw.setDate(tmrw.getDate() + 1);
    document.getElementById('book-date').value = tmrw.toISOString().split('T')[0];
    document.getElementById('book-time').value = '08:00';

    updateModalCost();
    modal.style.display = 'flex';
}

function closeBookingModal(e) {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.style.display = 'none';
}

function updateModalCost() {
    const rate = parseFloat(document.getElementById('modal-item-rate').value) || 0;
    const duration = parseFloat(document.getElementById('book-duration').value) || 1;
    const total = rate * duration;
    document.getElementById('modal-total-cost').textContent = `₹${total.toLocaleString('en-IN')}`;
}

function handleBookingSubmit(e) {
    e.preventDefault();
    closeBookingModal();

    const notice = document.getElementById('booking-success-alert');
    const msg = document.getElementById('booking-success-message');

    if (notice && msg) {
        msg.textContent = '🎉 Rental Booking Confirmed! Owner contact & sync notification sent.';
        notice.style.display = 'flex';
        setTimeout(() => {
            notice.style.display = 'none';
        }, 4000);
    }
}

function selectListingType(type) {
    currentListingType = type;
    const optMachine = document.getElementById('type-opt-machine');
    const optWorker = document.getElementById('type-opt-worker');

    if (optMachine) optMachine.classList.toggle('active', type === 'machine');
    if (optWorker) optWorker.classList.toggle('active', type === 'worker');

    populateCategoryDropdown(type);

    const lblName = document.getElementById('lbl-name');
    const inputName = document.getElementById('lst-name');
    const lblRate = document.getElementById('lbl-rate');
    const lblOwner = document.getElementById('lbl-owner');
    const inputOwner = document.getElementById('lst-owner');
    const uploadIcon = document.getElementById('upload-icon');
    const uploadText = document.getElementById('lbl-upload-text');
    const btnDay = document.getElementById('btn-unit-day');
    const btnHr = document.getElementById('btn-unit-hr');
    const selectUnit = document.getElementById('lst-rate-unit');

    if (type === 'worker') {
        if (lblName) lblName.textContent = 'Worker / Crew Name or Service';
        if (inputName) inputName.placeholder = 'e.g. Banana Desuckering & Harvesting Crew';
        if (lblRate) lblRate.textContent = 'Daily Wage / Wage Rate (₹ / day)';
        if (lblOwner) lblOwner.textContent = 'Team Leader / Supervisor Name';
        if (inputOwner) inputOwner.placeholder = 'e.g. Kaliappan';
        if (uploadIcon) uploadIcon.textContent = '👥';
        if (uploadText) uploadText.textContent = 'Upload Worker / Crew Photo or click to browse';

        if (btnDay && btnHr) {
            btnHr.classList.remove('active');
            btnDay.classList.add('active');
        }
        if (selectUnit) selectUnit.value = 'day';
    } else {
        if (lblName) lblName.textContent = 'Machine Name / Model';
        if (inputName) inputName.placeholder = 'e.g. Mahindra Arjun 555 DI';
        if (lblRate) lblRate.textContent = 'Reasonable Rental Rate (₹ / hour)';
        if (lblOwner) lblOwner.textContent = 'Owner / Provider Name';
        if (inputOwner) inputOwner.placeholder = 'e.g. Ramesh Patel';
        if (uploadIcon) uploadIcon.textContent = '🚜';
        if (uploadText) uploadText.textContent = 'Drag & drop machinery photo here or click to browse';

        if (btnDay && btnHr) {
            btnDay.classList.remove('active');
            btnHr.classList.add('active');
        }
        if (selectUnit) selectUnit.value = 'hr';
    }
}

function populateCategoryDropdown(type) {
    const select = document.getElementById('lst-category');
    if (!select) return;
    select.innerHTML = '';

    if (type === 'machine') {
        select.innerHTML = `
            <option value="tillage">Tillage & Land Prep</option>
            <option value="sowing">Sowing & Planting</option>
            <option value="care">Crop Care & Spraying</option>
            <option value="harvesting">Harvesting & Processing</option>
        `;
    } else {
        select.innerHTML = `
            <option value="harvesting">Bunch Harvesting & Loading</option>
            <option value="care">Spraying & Disease Care</option>
            <option value="tillage">Earthing up & Trenching</option>
            <option value="planting">Pit Digging & Planting</option>
        `;
    }
}

function triggerFileInput() {
    const input = document.getElementById('lst-image-file');
    if (input) input.click();
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            document.getElementById('upload-preview').src = evt.target.result;
            document.getElementById('upload-preview-container').style.display = 'block';
            document.getElementById('lbl-upload-text').textContent = `Selected: ${file.name}`;
        };
        reader.readAsDataURL(file);
    }
}

function handleListMachineSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('lst-name').value.trim();
    const rate = parseFloat(document.getElementById('lst-rate').value) || (currentListingType === 'worker' ? 800 : 350);
    const unit = document.getElementById('lst-rate-unit').value || (currentListingType === 'worker' ? 'day' : 'hr');
    const owner = document.getElementById('lst-owner').value.trim();
    const phone = document.getElementById('lst-phone').value.trim();
    const distanceVal = document.getElementById('lst-distance').value.trim() || '2.0';
    const distance = distanceVal.includes('km') ? distanceVal : distanceVal + ' km';
    const previewEl = document.getElementById('upload-preview');
    const previewImg = (previewEl && previewEl.src && !previewEl.src.endsWith('renting.html')) ? previewEl.src : '';

    if (currentListingType === 'worker') {
        const newWorker = {
            id: 'user_w_' + Date.now(),
            name: name,
            size: 'Certified Team',
            rate: rate,
            unit: unit,
            leader: owner,
            phone: phone,
            distance: distance,
            image: previewImg || 'maintenance_crew.png',
            specialty: `Farm labor service managed directly by ${owner}.`,
            badge: 'User Listed'
        };

        MANPOWER_DB.unshift(newWorker);
        saveUserListings();
        renderLaborGrid();
        switchRentingTab('manpower');
    } else {
        const newMachine = {
            id: 'user_m_' + Date.now(),
            name: name,
            category: document.getElementById('lst-category').value || 'tillage',
            hp: 'Verified Equipment',
            rate: rate,
            unit: unit,
            owner: owner,
            phone: phone,
            distance: distance,
            image: previewImg || 'john_deere_tractor.png',
            badge: 'User Listed',
            desc: `Available for hire directly from ${owner}.`
        };

        MACHINERY_DB.unshift(newMachine);
        saveUserListings();
        renderRentingGrid();
        switchRentingTab('equipment');
    }

    const notice = document.getElementById('booking-success-alert');
    const msg = document.getElementById('booking-success-message');

    if (notice && msg) {
        msg.textContent = currentListingType === 'worker' 
            ? '✅ Your worker crew has been published to RENTROX AI!' 
            : '✅ Your machinery has been published to RENTROX AI!';
        notice.style.display = 'flex';
        setTimeout(() => {
            notice.style.display = 'none';
        }, 4000);
    }

    document.getElementById('frm-list-machine').reset();
    const previewContainer = document.getElementById('upload-preview-container');
    if (previewContainer) previewContainer.style.display = 'none';
}

function toggleAdminMode(checked) {
    isAdminMode = checked;
}
