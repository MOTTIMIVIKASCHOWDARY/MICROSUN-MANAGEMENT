// YEXA AI - Yield & Expense Analytics Engine
// MICROSUN MANAGEMENT SYSTEM - FULLY SYNCHRONIZED DUAL INPUT ENGINE

document.addEventListener('DOMContentLoaded', () => {
    initAnalyticsEngine();
});

const BANANA_VARIANTS_DB = {
    grand_naine: { name: 'Grand Naine (G9)', avgWeight: 30, avgPrice: 14000, plantsPerAcre: 1000, fertPerPlant: 28, pestPerPlant: 14, rentPerPlant: 10, laborPerPlant: 38, waterPerPlant: 8, miscPerPlant: 6 },
    kaveri_sugantham: { name: 'Kaveri Sugantham', avgWeight: 32, avgPrice: 16500, plantsPerAcre: 1000, fertPerPlant: 30, pestPerPlant: 14, rentPerPlant: 10, laborPerPlant: 38, waterPerPlant: 8, miscPerPlant: 6 },
    kaveri_haritha: { name: 'Kaveri Haritha', avgWeight: 35, avgPrice: 15000, plantsPerAcre: 1000, fertPerPlant: 32, pestPerPlant: 15, rentPerPlant: 10, laborPerPlant: 40, waterPerPlant: 8, miscPerPlant: 6 },
    kaveri_saba: { name: 'Kaveri Saba', avgWeight: 28, avgPrice: 18000, plantsPerAcre: 1000, fertPerPlant: 28, pestPerPlant: 14, rentPerPlant: 10, laborPerPlant: 38, waterPerPlant: 8, miscPerPlant: 6 },
    udhayam: { name: 'Udhayam', avgWeight: 30, avgPrice: 15500, plantsPerAcre: 1000, fertPerPlant: 28, pestPerPlant: 14, rentPerPlant: 10, laborPerPlant: 38, waterPerPlant: 8, miscPerPlant: 6 },
    kaveri_poovan: { name: 'Kaveri Poovan', avgWeight: 24, avgPrice: 18000, plantsPerAcre: 1000, fertPerPlant: 25, pestPerPlant: 12, rentPerPlant: 10, laborPerPlant: 35, waterPerPlant: 8, miscPerPlant: 5 },
    matti: { name: 'Matti', avgWeight: 16, avgPrice: 28000, plantsPerAcre: 1200, fertPerPlant: 22, pestPerPlant: 12, rentPerPlant: 8, laborPerPlant: 30, waterPerPlant: 7, miscPerPlant: 5 },
    semmatti: { name: 'Semmatti', avgWeight: 18, avgPrice: 30000, plantsPerAcre: 1200, fertPerPlant: 24, pestPerPlant: 12, rentPerPlant: 8, laborPerPlant: 30, waterPerPlant: 7, miscPerPlant: 5 },
    kaveri_kanchan: { name: 'Kaveri Kanchan', avgWeight: 26, avgPrice: 20000, plantsPerAcre: 1000, fertPerPlant: 26, pestPerPlant: 13, rentPerPlant: 10, laborPerPlant: 36, waterPerPlant: 8, miscPerPlant: 5 },
    bhatmanohar: { name: 'Bhatmanohar', avgWeight: 25, avgPrice: 17000, plantsPerAcre: 1000, fertPerPlant: 25, pestPerPlant: 12, rentPerPlant: 10, laborPerPlant: 35, waterPerPlant: 8, miscPerPlant: 5 },
    borkal_baista: { name: 'Borkal Baista', avgWeight: 22, avgPrice: 19000, plantsPerAcre: 1000, fertPerPlant: 24, pestPerPlant: 12, rentPerPlant: 10, laborPerPlant: 35, waterPerPlant: 8, miscPerPlant: 5 },
    nrcb_selection_19: { name: 'NRCB Selection 19', avgWeight: 32, avgPrice: 16000, plantsPerAcre: 1000, fertPerPlant: 30, pestPerPlant: 14, rentPerPlant: 10, laborPerPlant: 38, waterPerPlant: 8, miscPerPlant: 6 },
    yelakki: { name: 'Yelakki', avgWeight: 14, avgPrice: 34000, plantsPerAcre: 1200, fertPerPlant: 22, pestPerPlant: 10, rentPerPlant: 8, laborPerPlant: 32, waterPerPlant: 7, miscPerPlant: 5 },
    red_banana: { name: 'Red Banana', avgWeight: 22, avgPrice: 38000, plantsPerAcre: 1000, fertPerPlant: 30, pestPerPlant: 15, rentPerPlant: 10, laborPerPlant: 42, waterPerPlant: 9, miscPerPlant: 6 },
    karpooravalli: { name: 'Karpooravalli', avgWeight: 25, avgPrice: 16000, plantsPerAcre: 1000, fertPerPlant: 25, pestPerPlant: 12, rentPerPlant: 10, laborPerPlant: 35, waterPerPlant: 8, miscPerPlant: 5 },
    robusta: { name: 'Robusta', avgWeight: 28, avgPrice: 13500, plantsPerAcre: 1000, fertPerPlant: 27, pestPerPlant: 13, rentPerPlant: 10, laborPerPlant: 36, waterPerPlant: 8, miscPerPlant: 5 },
    dwarf_cavendish: { name: 'Dwarf Cavendish', avgWeight: 25, avgPrice: 12000, plantsPerAcre: 1000, fertPerPlant: 25, pestPerPlant: 12, rentPerPlant: 10, laborPerPlant: 35, waterPerPlant: 8, miscPerPlant: 5 },
    nendran: { name: 'Nendran', avgWeight: 16, avgPrice: 28000, plantsPerAcre: 1000, fertPerPlant: 28, pestPerPlant: 14, rentPerPlant: 10, laborPerPlant: 38, waterPerPlant: 8, miscPerPlant: 6 },
    njalipoovan: { name: 'Njalipoovan', avgWeight: 15, avgPrice: 32000, plantsPerAcre: 1200, fertPerPlant: 22, pestPerPlant: 11, rentPerPlant: 8, laborPerPlant: 32, waterPerPlant: 7, miscPerPlant: 5 },
    safed_velchi: { name: 'Safed Velchi', avgWeight: 14, avgPrice: 35000, plantsPerAcre: 1200, fertPerPlant: 22, pestPerPlant: 10, rentPerPlant: 8, laborPerPlant: 30, waterPerPlant: 7, miscPerPlant: 5 },
    kaveri_kanya: { name: 'Kaveri Kanya', avgWeight: 26, avgPrice: 22000, plantsPerAcre: 1000, fertPerPlant: 26, pestPerPlant: 13, rentPerPlant: 10, laborPerPlant: 36, waterPerPlant: 8, miscPerPlant: 5 },
    monthan: { name: 'Monthan (Cooking)', avgWeight: 20, avgPrice: 16000, plantsPerAcre: 1000, fertPerPlant: 24, pestPerPlant: 12, rentPerPlant: 10, laborPerPlant: 34, waterPerPlant: 8, miscPerPlant: 5 },
    hill_banana: { name: 'Hill Banana (Sirumalai)', avgWeight: 18, avgPrice: 45000, plantsPerAcre: 1000, fertPerPlant: 30, pestPerPlant: 15, rentPerPlant: 10, laborPerPlant: 45, waterPerPlant: 9, miscPerPlant: 7 },
    kaveri_kalki: { name: 'Kaveri Kalki', avgWeight: 28, avgPrice: 24000, plantsPerAcre: 1000, fertPerPlant: 28, pestPerPlant: 14, rentPerPlant: 10, laborPerPlant: 38, waterPerPlant: 8, miscPerPlant: 6 }
};

let roiChartInstance = null;
let expenseChartInstance = null;

function initAnalyticsEngine() {
    const variantSelect = document.getElementById('variant-select');
    const farmInput = document.getElementById('farm-size-input');
    const densitySelect = document.getElementById('density-select');

    const inputPlants = document.getElementById('input-plants');
    const slidePlants = document.getElementById('slide-plants');

    const inputWeight = document.getElementById('input-weight');
    const slideWeight = document.getElementById('slide-weight');

    const inputPriceKg = document.getElementById('input-price-kg');
    const inputPriceTon = document.getElementById('input-price-ton');
    const slidePrice = document.getElementById('slide-price');

    const inputFertilizer = document.getElementById('input-fertilizer');
    const slideFertilizer = document.getElementById('slide-fertilizer');

    const inputPesticides = document.getElementById('input-pesticides');
    const slidePesticides = document.getElementById('slide-pesticides');

    const inputRentals = document.getElementById('input-rentals');
    const slideRentals = document.getElementById('slide-rentals');

    const inputLabor = document.getElementById('input-labor');
    const slideLabor = document.getElementById('slide-labor');

    const inputWater = document.getElementById('input-water');
    const slideWater = document.getElementById('slide-water');

    const inputMisc = document.getElementById('input-misc');
    const slideMisc = document.getElementById('slide-misc');

    const btnReset = document.getElementById('btn-reset');

    // Recall stored user profile data
    const savedCrop = localStorage.getItem('microsun_user_crop');
    const savedAcres = localStorage.getItem('microsun_user_acres');

    if (savedCrop && variantSelect) {
        for (let i = 0; i < variantSelect.options.length; i++) {
            if (variantSelect.options[i].text.toLowerCase().includes(savedCrop.toLowerCase()) ||
                variantSelect.options[i].value.toLowerCase().includes(savedCrop.toLowerCase())) {
                variantSelect.selectedIndex = i;
                break;
            }
        }
    }

    if (savedAcres && farmInput) {
        farmInput.value = savedAcres;
    }

    function syncExpensesForPlantCount(totalPlants) {
        const key = variantSelect ? variantSelect.value : 'grand_naine';
        const data = BANANA_VARIANTS_DB[key] || BANANA_VARIANTS_DB.grand_naine;

        const fert = Math.round(totalPlants * (data.fertPerPlant || 28));
        const pest = Math.round(totalPlants * (data.pestPerPlant || 14));
        const rent = Math.round(totalPlants * (data.rentPerPlant || 10));
        const labor = Math.round(totalPlants * (data.laborPerPlant || 38));
        const water = Math.round(totalPlants * (data.waterPerPlant || 8));
        const misc = Math.round(totalPlants * (data.miscPerPlant || 6));

        if (inputFertilizer) inputFertilizer.value = fert;
        if (slideFertilizer) {
            slideFertilizer.max = Math.max(1000, Math.round(fert * 2.5));
            slideFertilizer.value = fert;
        }

        if (inputPesticides) inputPesticides.value = pest;
        if (slidePesticides) {
            slidePesticides.max = Math.max(1000, Math.round(pest * 2.5));
            slidePesticides.value = pest;
        }

        if (inputRentals) inputRentals.value = rent;
        if (slideRentals) {
            slideRentals.max = Math.max(1000, Math.round(rent * 2.5));
            slideRentals.value = rent;
        }

        if (inputLabor) inputLabor.value = labor;
        if (slideLabor) {
            slideLabor.max = Math.max(1000, Math.round(labor * 2.5));
            slideLabor.value = labor;
        }

        if (inputWater) inputWater.value = water;
        if (slideWater) {
            slideWater.max = Math.max(1000, Math.round(water * 2.5));
            slideWater.value = water;
        }

        if (inputMisc) inputMisc.value = misc;
        if (slideMisc) {
            slideMisc.max = Math.max(1000, Math.round(misc * 2.5));
            slideMisc.value = misc;
        }
    }

    function applyDefaultsForVariety(resetExpenses = true) {
        const key = variantSelect ? variantSelect.value : 'grand_naine';
        const data = BANANA_VARIANTS_DB[key] || BANANA_VARIANTS_DB.grand_naine;
        const acres = parseFloat(farmInput ? farmInput.value : 5) || 1;
        
        let density = data.plantsPerAcre || 1000;
        if (densitySelect && densitySelect.value !== 'custom') {
            density = parseFloat(densitySelect.value) || density;
        }

        const totalPlants = Math.max(1, Math.round(acres * density));

        // Update Plant count inputs & dynamic slider max
        if (inputPlants) inputPlants.value = totalPlants;
        if (slidePlants) {
            slidePlants.min = 1;
            slidePlants.max = Math.max(100, Math.round(totalPlants * 2));
            slidePlants.value = totalPlants;
        }

        // Update Weight
        if (inputWeight) inputWeight.value = data.avgWeight;
        if (slideWeight) {
            slideWeight.max = Math.max(80, Math.round(data.avgWeight * 2));
            slideWeight.value = data.avgWeight;
        }

        // Update Market Price
        const priceTon = data.avgPrice || 14000;
        const priceKg = priceTon / 1000;
        if (inputPriceTon) inputPriceTon.value = priceTon;
        if (inputPriceKg) inputPriceKg.value = priceKg;
        if (slidePrice) {
            slidePrice.max = Math.max(80000, Math.round(priceTon * 2));
            slidePrice.value = priceTon;
        }

        if (resetExpenses) {
            syncExpensesForPlantCount(totalPlants);
        }

        updateCalculations();
    }

    // Two-way synchronization binder
    function bindTwoWay(inputEl, sliderEl, onCustomChange) {
        if (!inputEl || !sliderEl) return;

        sliderEl.addEventListener('input', () => {
            inputEl.value = sliderEl.value;
            if (onCustomChange) onCustomChange(parseFloat(sliderEl.value) || 0);
            updateCalculations();
        });

        inputEl.addEventListener('input', () => {
            const val = parseFloat(inputEl.value) || 0;
            if (val > parseFloat(sliderEl.max)) {
                sliderEl.max = Math.round(val * 1.5);
            }
            if (val < parseFloat(sliderEl.min)) {
                sliderEl.min = Math.max(0, Math.floor(val * 0.5));
            }
            sliderEl.value = val;
            if (onCustomChange) onCustomChange(val);
            updateCalculations();
        });
    }

    // When user changes plant count manually, automatically scale expenses proportionally
    bindTwoWay(inputPlants, slidePlants, (newPlantCount) => {
        if (densitySelect) densitySelect.value = 'custom';
        syncExpensesForPlantCount(newPlantCount);
    });

    bindTwoWay(inputWeight, slideWeight);

    // Synchronize Dual Market Price (₹/kg and ₹/Ton) with Slider
    if (inputPriceKg && inputPriceTon && slidePrice) {
        inputPriceKg.addEventListener('input', () => {
            const kg = parseFloat(inputPriceKg.value) || 0;
            const ton = Math.round(kg * 1000);
            inputPriceTon.value = ton;
            if (ton > parseFloat(slidePrice.max)) slidePrice.max = Math.round(ton * 1.5);
            slidePrice.value = ton;
            updateCalculations();
        });

        inputPriceTon.addEventListener('input', () => {
            const ton = parseFloat(inputPriceTon.value) || 0;
            inputPriceKg.value = (ton / 1000).toFixed(1);
            if (ton > parseFloat(slidePrice.max)) slidePrice.max = Math.round(ton * 1.5);
            slidePrice.value = ton;
            updateCalculations();
        });

        slidePrice.addEventListener('input', () => {
            const ton = parseFloat(slidePrice.value) || 0;
            inputPriceTon.value = ton;
            inputPriceKg.value = (ton / 1000).toFixed(1);
            updateCalculations();
        });
    }

    bindTwoWay(inputFertilizer, slideFertilizer);
    bindTwoWay(inputPesticides, slidePesticides);
    bindTwoWay(inputRentals, slideRentals);
    bindTwoWay(inputLabor, slideLabor);
    bindTwoWay(inputWater, slideWater);
    bindTwoWay(inputMisc, slideMisc);

    // Dropdown change listeners
    if (variantSelect) {
        variantSelect.addEventListener('change', () => applyDefaultsForVariety(true));
    }

    if (farmInput) {
        farmInput.addEventListener('input', () => applyDefaultsForVariety(true));
    }

    if (densitySelect) {
        densitySelect.addEventListener('change', () => {
            if (densitySelect.value !== 'custom') {
                applyDefaultsForVariety(true);
            }
        });
    }

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            if (variantSelect) variantSelect.value = 'grand_naine';
            if (farmInput) farmInput.value = '5';
            if (densitySelect) densitySelect.value = '1000';
            applyDefaultsForVariety(true);
        });
    }

    // Initialize defaults
    applyDefaultsForVariety(true);
    initLanguageSwitcher();
}

function initLanguageSwitcher() {
    const langSwitch = document.getElementById('lang-switch');
    if (langSwitch) {
        langSwitch.addEventListener('change', (e) => {
            applyAnalyticsLanguage(e.target.value);
        });
        const currentLang = localStorage.getItem('microsun_app_lang') || 'en';
        langSwitch.value = currentLang;
        applyAnalyticsLanguage(currentLang);
    }
}

function applyAnalyticsLanguage(lang) {
    localStorage.setItem('microsun_app_lang', lang);
    const trans = (typeof analyticsTranslations !== 'undefined' && analyticsTranslations[lang]) ? analyticsTranslations[lang] : (analyticsTranslations?.en || {});
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (trans[key]) {
            el.textContent = trans[key];
        }
    });

    updateCalculations();
}

function formatCurrency(val) {
    return '₹' + Math.round(val).toLocaleString('en-IN');
}

function updateCalculations() {
    const currentLang = localStorage.getItem('microsun_app_lang') || 'en';
    const trans = (typeof analyticsTranslations !== 'undefined' && analyticsTranslations[currentLang]) ? analyticsTranslations[currentLang] : (analyticsTranslations?.en || {});

    // Numeric Inputs
    const plantCount = Math.max(1, parseFloat(document.getElementById('input-plants')?.value || 5000));
    const bunchWeight = parseFloat(document.getElementById('input-weight')?.value || 30);
    const pricePerTon = parseFloat(document.getElementById('input-price-ton')?.value || 14000);
    const farmAcres = Math.max(0.01, parseFloat(document.getElementById('farm-size-input')?.value || 5));
    const plantsPerAcreRatio = Math.round(plantCount / farmAcres);
    const pricePerKg = pricePerTon / 1000;

    const fertCost = parseFloat(document.getElementById('input-fertilizer')?.value || 0);
    const pestCost = parseFloat(document.getElementById('input-pesticides')?.value || 0);
    const rentCost = parseFloat(document.getElementById('input-rentals')?.value || 0);
    const laborCost = parseFloat(document.getElementById('input-labor')?.value || 0);
    const waterCost = parseFloat(document.getElementById('input-water')?.value || 0);
    const miscCost = parseFloat(document.getElementById('input-misc')?.value || 0);

    // Update Dynamic Ratio Tags with clear descriptive labels
    if (document.getElementById('tag-plants')) {
        document.getElementById('tag-plants').textContent = `🌿 Density: ${plantsPerAcreRatio.toLocaleString('en-IN')} plants / Acre (${farmAcres} Acres)`;
    }
    if (document.getElementById('tag-weight')) {
        document.getElementById('tag-weight').textContent = `🍌 Bunch: ${bunchWeight} kg / plant`;
    }
    if (document.getElementById('tag-price')) {
        document.getElementById('tag-price').textContent = `💰 Rate: ₹${pricePerKg.toFixed(1)} / kg (₹${Math.round(pricePerTon).toLocaleString('en-IN')} / Ton)`;
    }

    if (document.getElementById('tag-fertilizer')) document.getElementById('tag-fertilizer').textContent = `🌱 ₹${Math.round(fertCost/plantCount)} per plant`;
    if (document.getElementById('tag-pesticides')) document.getElementById('tag-pesticides').textContent = `🛡️ ₹${Math.round(pestCost/plantCount)} per plant`;
    if (document.getElementById('tag-rentals')) document.getElementById('tag-rentals').textContent = `🚜 ₹${Math.round(rentCost/plantCount)} per plant`;
    if (document.getElementById('tag-labor')) document.getElementById('tag-labor').textContent = `👥 ₹${Math.round(laborCost/plantCount)} per plant`;
    if (document.getElementById('tag-water')) document.getElementById('tag-water').textContent = `💧 ₹${Math.round(waterCost/plantCount)} per plant`;
    if (document.getElementById('tag-misc')) document.getElementById('tag-misc').textContent = `📦 ₹${Math.round(miscCost/plantCount)} per plant`;

    // Core Agronomic & Economic Math
    const totalCost = fertCost + pestCost + rentCost + laborCost + waterCost + miscCost;
    const totalYieldKg = plantCount * bunchWeight;
    const totalYieldTons = totalYieldKg / 1000;
    const totalYieldQuintals = totalYieldKg / 100;
    const grossRevenue = totalYieldTons * pricePerTon;
    const netProfit = grossRevenue - totalCost;
    const roiPct = totalCost > 0 ? ((netProfit / totalCost) * 100) : 0;
    const costPerPlant = totalCost / plantCount;
    const costPerAcre = totalCost / farmAcres;
    const revPerAcre = grossRevenue / farmAcres;
    const profitPerPlant = netProfit / plantCount;
    const profitPerAcre = netProfit / farmAcres;
    const breakEvenPricePerTon = totalYieldTons > 0 ? (totalCost / totalYieldTons) : 0;
    const breakEvenPricePerKg = breakEvenPricePerTon / 1000;

    // Update KPI Cards
    const kpiTotalCost = document.getElementById('kpi-total-cost');
    const kpiCostPerPlant = document.getElementById('kpi-cost-per-plant');
    const kpiEstYield = document.getElementById('kpi-est-yield');
    const kpiYieldPerPlant = document.getElementById('kpi-yield-per-plant');
    const kpiGrossRev = document.getElementById('kpi-gross-rev');
    const kpiNetProfit = document.getElementById('kpi-net-profit');
    const kpiProfitStatus = document.getElementById('kpi-profit-status');
    const kpiRoi = document.getElementById('kpi-roi');
    const kpiRoiFill = document.getElementById('kpi-roi-fill');
    const kpiBreakEven = document.getElementById('kpi-break-even');

    if (kpiTotalCost) kpiTotalCost.textContent = formatCurrency(totalCost);
    if (kpiCostPerPlant) kpiCostPerPlant.textContent = `₹${Math.round(costPerPlant)} / plant (${formatCurrency(costPerAcre)}/Acre)`;

    if (kpiEstYield) kpiEstYield.textContent = totalYieldTons >= 1 ? `${totalYieldTons.toFixed(1)} Tons` : `${Math.round(totalYieldKg)} kg`;
    if (kpiYieldPerPlant) kpiYieldPerPlant.textContent = `${bunchWeight} kg/plant (${Math.round(totalYieldQuintals).toLocaleString('en-IN')} Q)`;

    if (kpiGrossRev) kpiGrossRev.textContent = formatCurrency(grossRevenue);

    if (kpiBreakEven) {
        kpiBreakEven.textContent = `Break-even: ₹${breakEvenPricePerKg.toFixed(2)}/kg`;
    }

    if (kpiNetProfit) {
        kpiNetProfit.textContent = formatCurrency(netProfit);
        if (netProfit < 0) {
            kpiNetProfit.style.color = '#d32f2f';
            if (kpiProfitStatus) {
                kpiProfitStatus.textContent = trans.statusLoss || '⚠️ Operating Loss Warning';
                kpiProfitStatus.style.color = '#d32f2f';
            }
        } else {
            kpiNetProfit.style.color = '#2e7d32';
            if (kpiProfitStatus) {
                kpiProfitStatus.textContent = `${trans.statusProfitable || '🟢 Favorable Net Profit'} (₹${Math.round(profitPerAcre).toLocaleString('en-IN')}/Acre)`;
                kpiProfitStatus.style.color = '#2e7d32';
            }
        }
    }

    if (kpiRoi) {
        kpiRoi.textContent = `${roiPct.toFixed(1)}%`;
        kpiRoi.style.color = roiPct < 0 ? '#d32f2f' : '#111111';
    }
    if (kpiRoiFill) {
        const fillWidth = Math.min(100, Math.max(0, roiPct / 2));
        kpiRoiFill.style.width = `${fillWidth}%`;
        kpiRoiFill.style.background = roiPct < 0 ? '#d32f2f' : 'linear-gradient(90deg, #4caf50, #2e7d32)';
    }

    // Update Financial Summary Table Cards
    const sumTotalYield = document.getElementById('sum-total-yield');
    const sumYieldSub = document.getElementById('sum-yield-sub');
    const sumCostAcre = document.getElementById('sum-cost-acre');
    const sumCostPlant = document.getElementById('sum-cost-plant');
    const sumRevAcre = document.getElementById('sum-rev-acre');
    const sumRevPlant = document.getElementById('sum-rev-plant');
    const sumProfitAcre = document.getElementById('sum-profit-acre');
    const sumProfitPlant = document.getElementById('sum-profit-plant');
    const sumBreakEven = document.getElementById('sum-break-even');
    const sumBreakEvenTon = document.getElementById('sum-break-even-ton');

    if (sumTotalYield) sumTotalYield.textContent = totalYieldTons >= 1 ? `${totalYieldTons.toFixed(1)} Tons` : `${Math.round(totalYieldKg)} kg`;
    if (sumYieldSub) sumYieldSub.textContent = `${Math.round(totalYieldQuintals).toLocaleString('en-IN')} Quintals (${bunchWeight} kg/plant)`;
    if (sumCostAcre) sumCostAcre.textContent = `${formatCurrency(costPerAcre)} / Acre`;
    if (sumCostPlant) sumCostPlant.textContent = `₹${Math.round(costPerPlant)} / plant`;
    if (sumRevAcre) sumRevAcre.textContent = `${formatCurrency(revPerAcre)} / Acre`;
    if (sumRevPlant) sumRevPlant.textContent = `₹${Math.round(grossRevenue/plantCount)} / plant (₹${pricePerKg.toFixed(1)}/kg)`;
    if (sumProfitAcre) {
        sumProfitAcre.textContent = `${formatCurrency(profitPerAcre)} / Acre`;
        sumProfitAcre.style.color = profitPerAcre < 0 ? '#d32f2f' : '#2e7d32';
    }
    if (sumProfitPlant) {
        sumProfitPlant.textContent = `₹${Math.round(profitPerPlant)} / plant (${roiPct.toFixed(1)}% ROI)`;
        sumProfitPlant.style.color = profitPerPlant < 0 ? '#d32f2f' : '#2e7d32';
    }
    if (sumBreakEven) sumBreakEven.textContent = `₹${breakEvenPricePerKg.toFixed(2)} / kg`;
    if (sumBreakEvenTon) sumBreakEvenTon.textContent = `${formatCurrency(breakEvenPricePerTon)} / Ton`;

    // Render Charts
    renderCharts(totalCost, grossRevenue, netProfit, {
        fertCost, pestCost, rentCost, laborCost, waterCost, miscCost
    }, trans);
}

function renderCharts(totalCost, grossRevenue, netProfit, expenses, trans) {
    if (typeof Chart === 'undefined') return;

    const lblInvestment = trans?.chartInvestment || 'Total Investment';
    const lblRevenue = trans?.chartRevenue || 'Gross Revenue';
    const lblProfit = netProfit >= 0 ? (trans?.chartProfit || 'Net Profit') : (trans?.chartLoss || 'Net Loss');

    // 1. Budget & Revenue Visualizer Bar Chart
    const ctxRoi = document.getElementById('roiChart')?.getContext('2d');
    if (ctxRoi) {
        if (roiChartInstance) roiChartInstance.destroy();

        roiChartInstance = new Chart(ctxRoi, {
            type: 'bar',
            data: {
                labels: [lblInvestment, lblRevenue, lblProfit],
                datasets: [{
                    label: 'Amount (₹)',
                    data: [totalCost, grossRevenue, Math.abs(netProfit)],
                    backgroundColor: [
                        'rgba(244, 67, 54, 0.85)',
                        'rgba(33, 150, 243, 0.85)',
                        netProfit >= 0 ? 'rgba(76, 175, 80, 0.85)' : 'rgba(211, 47, 47, 0.85)'
                    ],
                    borderColor: [
                        '#d32f2f',
                        '#1976d2',
                        netProfit >= 0 ? '#388e3c' : '#b71c1c'
                    ],
                    borderWidth: 2,
                    borderRadius: 12
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(ctx) {
                                const isLoss = ctx.dataIndex === 2 && netProfit < 0;
                                const prefix = isLoss ? ' -₹' : ' ₹';
                                return prefix + Math.abs(ctx.parsed.y).toLocaleString('en-IN');
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            color: '#000000',
                            callback: function(val) {
                                return '₹' + (val >= 100000 ? (val / 100000).toFixed(1) + 'L' : (val / 1000) + 'k');
                            },
                            font: { family: 'Outfit', weight: '800', size: 12 }
                        },
                        grid: { color: 'rgba(0, 0, 0, 0.08)' }
                    },
                    x: {
                        ticks: {
                            color: '#000000',
                            font: { family: 'Outfit', weight: '800', size: 13 }
                        },
                        grid: { color: 'rgba(0, 0, 0, 0.04)' }
                    }
                }
            }
        });
    }

    // 2. Expense Breakdown Share Doughnut Chart
    const ctxExpense = document.getElementById('expenseChart')?.getContext('2d');
    if (ctxExpense) {
        if (expenseChartInstance) expenseChartInstance.destroy();

        const totalExpenses = (expenses.fertCost + expenses.pestCost + expenses.rentCost + expenses.laborCost + expenses.waterCost + expenses.miscCost) || 1;

        expenseChartInstance = new Chart(ctxExpense, {
            type: 'doughnut',
            data: {
                labels: ['Fertilizers', 'Pesticides', 'Rentals', 'Labor', 'Water', 'Overhead'],
                datasets: [{
                    data: [
                        expenses.fertCost,
                        expenses.pestCost,
                        expenses.rentCost,
                        expenses.laborCost,
                        expenses.waterCost,
                        expenses.miscCost
                    ],
                    backgroundColor: [
                        '#0066ff',
                        '#e65100',
                        '#9c27b0',
                        '#2e7d32',
                        '#008080',
                        '#f57f17'
                    ],
                    borderWidth: 3,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#000000',
                            font: { family: 'Outfit', weight: '800', size: 13 },
                            padding: 10,
                            boxWidth: 16
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(ctx) {
                                const val = ctx.parsed;
                                const pct = ((val / totalExpenses) * 100).toFixed(1);
                                return ` ${ctx.label}: ₹${val.toLocaleString('en-IN')} (${pct}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
}
