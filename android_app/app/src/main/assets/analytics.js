// YEXA AI - Yield & Expense Analytics Engine
// MICROSUN MANAGEMENT SYSTEM

document.addEventListener('DOMContentLoaded', () => {
    initAnalyticsEngine();
});

const BANANA_VARIANTS_DB = {
    grand_naine: { name: 'Grand Naine (G9)', avgWeight: 30, avgPrice: 14000, plantsPerAcre: 1000 },
    kaveri_sugantham: { name: 'Kaveri Sugantham', avgWeight: 32, avgPrice: 16500, plantsPerAcre: 1000 },
    kaveri_haritha: { name: 'Kaveri Haritha', avgWeight: 35, avgPrice: 15000, plantsPerAcre: 1000 },
    kaveri_saba: { name: 'Kaveri Saba', avgWeight: 28, avgPrice: 18000, plantsPerAcre: 1000 },
    udhayam: { name: 'Udhayam', avgWeight: 30, avgPrice: 15500, plantsPerAcre: 1000 },
    kaveri_poovan: { name: 'Kaveri Poovan', avgWeight: 24, avgPrice: 18000, plantsPerAcre: 1000 },
    matti: { name: 'Matti', avgWeight: 16, avgPrice: 28000, plantsPerAcre: 1200 },
    semmatti: { name: 'Semmatti', avgWeight: 18, avgPrice: 30000, plantsPerAcre: 1200 },
    kaveri_kanchan: { name: 'Kaveri Kanchan', avgWeight: 26, avgPrice: 20000, plantsPerAcre: 1000 },
    bhatmanohar: { name: 'Bhatmanohar', avgWeight: 25, avgPrice: 17000, plantsPerAcre: 1000 },
    borkal_baista: { name: 'Borkal Baista', avgWeight: 22, avgPrice: 19000, plantsPerAcre: 1000 },
    nrcb_selection_19: { name: 'NRCB Selection 19', avgWeight: 32, avgPrice: 16000, plantsPerAcre: 1000 },
    yelakki: { name: 'Yelakki', avgWeight: 14, avgPrice: 34000, plantsPerAcre: 1200 },
    red_banana: { name: 'Red Banana', avgWeight: 22, avgPrice: 38000, plantsPerAcre: 1000 },
    karpooravalli: { name: 'Karpooravalli', avgWeight: 25, avgPrice: 16000, plantsPerAcre: 1000 },
    robusta: { name: 'Robusta', avgWeight: 28, avgPrice: 13500, plantsPerAcre: 1000 },
    dwarf_cavendish: { name: 'Dwarf Cavendish', avgWeight: 25, avgPrice: 12000, plantsPerAcre: 1000 },
    nendran: { name: 'Nendran', avgWeight: 16, avgPrice: 28000, plantsPerAcre: 1000 },
    njalipoovan: { name: 'Njalipoovan', avgWeight: 15, avgPrice: 32000, plantsPerAcre: 1200 },
    safed_velchi: { name: 'Safed Velchi', avgWeight: 14, avgPrice: 35000, plantsPerAcre: 1200 },
    kaveri_kanya: { name: 'Kaveri Kanya', avgWeight: 26, avgPrice: 22000, plantsPerAcre: 1000 },
    monthan: { name: 'Monthan (Cooking)', avgWeight: 20, avgPrice: 16000, plantsPerAcre: 1000 },
    hill_banana: { name: 'Hill Banana (Sirumalai)', avgWeight: 18, avgPrice: 45000, plantsPerAcre: 1000 },
    kaveri_kalki: { name: 'Kaveri Kalki', avgWeight: 28, avgPrice: 24000, plantsPerAcre: 1000 }
};

let roiChartInstance = null;
let expenseChartInstance = null;

function initAnalyticsEngine() {
    const variantSelect = document.getElementById('variant-select');
    const farmInput = document.getElementById('farm-size-input');
    const slidePlants = document.getElementById('slide-plants');
    const slideWeight = document.getElementById('slide-weight');
    const slidePrice = document.getElementById('slide-price');

    const slideFertilizer = document.getElementById('slide-fertilizer');
    const slidePesticides = document.getElementById('slide-pesticides');
    const slideRentals = document.getElementById('slide-rentals');
    const slideLabor = document.getElementById('slide-labor');
    const slideWater = document.getElementById('slide-water');
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

    // Auto-update values on variant change
    if (variantSelect) {
        variantSelect.addEventListener('change', () => {
            const key = variantSelect.value;
            const data = BANANA_VARIANTS_DB[key] || BANANA_VARIANTS_DB.grand_naine;
            const acres = parseFloat(farmInput ? farmInput.value : 5) || 5;

            if (slideWeight) slideWeight.value = data.avgWeight;
            if (slidePrice) slidePrice.value = data.avgPrice;
            if (slidePlants) slidePlants.value = Math.round(acres * data.plantsPerAcre);

            updateCalculations();
        });
    }

    // Auto-update values on farm land size change
    if (farmInput) {
        farmInput.addEventListener('input', () => {
            const key = variantSelect ? variantSelect.value : 'grand_naine';
            const data = BANANA_VARIANTS_DB[key] || BANANA_VARIANTS_DB.grand_naine;
            const acres = parseFloat(farmInput.value) || 1;
            if (slidePlants) slidePlants.value = Math.round(acres * data.plantsPerAcre);
            updateCalculations();
        });
    }

    // Attach listeners to all input sliders
    const allSliders = [
        slidePlants, slideWeight, slidePrice,
        slideFertilizer, slidePesticides, slideRentals,
        slideLabor, slideWater, slideMisc
    ];

    allSliders.forEach(slider => {
        if (slider) {
            slider.addEventListener('input', updateCalculations);
            slider.addEventListener('change', updateCalculations);
        }
    });

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            if (variantSelect) variantSelect.value = 'grand_naine';
            if (farmInput) farmInput.value = '5';
            if (slidePlants) slidePlants.value = '5000';
            if (slideWeight) slideWeight.value = '30';
            if (slidePrice) slidePrice.value = '12000';

            if (slideFertilizer) slideFertilizer.value = '75000';
            if (slidePesticides) slidePesticides.value = '30000';
            if (slideRentals) slideRentals.value = '25000';
            if (slideLabor) slideLabor.value = '100000';
            if (slideWater) slideWater.value = '15000';
            if (slideMisc) slideMisc.value = '10000';

            updateCalculations();
        });
    }

    // Initial calculation trigger
    updateCalculations();
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
}

function formatCurrency(val) {
    return '₹' + Math.round(val).toLocaleString('en-IN');
}

function updateCalculations() {
    // Inputs
    const plantCount = parseFloat(document.getElementById('slide-plants')?.value || 5000);
    const bunchWeight = parseFloat(document.getElementById('slide-weight')?.value || 30);
    const pricePerTon = parseFloat(document.getElementById('slide-price')?.value || 12000);

    const fertCost = parseFloat(document.getElementById('slide-fertilizer')?.value || 75000);
    const pestCost = parseFloat(document.getElementById('slide-pesticides')?.value || 30000);
    const rentCost = parseFloat(document.getElementById('slide-rentals')?.value || 25000);
    const laborCost = parseFloat(document.getElementById('slide-labor')?.value || 100000);
    const waterCost = parseFloat(document.getElementById('slide-water')?.value || 15000);
    const miscCost = parseFloat(document.getElementById('slide-misc')?.value || 10000);

    // Update Badges
    if (document.getElementById('val-plants')) document.getElementById('val-plants').textContent = plantCount.toLocaleString('en-IN');
    if (document.getElementById('val-weight')) document.getElementById('val-weight').textContent = `${bunchWeight} kg`;
    if (document.getElementById('val-price')) document.getElementById('val-price').textContent = formatCurrency(pricePerTon);

    if (document.getElementById('val-fertilizer')) document.getElementById('val-fertilizer').textContent = formatCurrency(fertCost);
    if (document.getElementById('val-pesticides')) document.getElementById('val-pesticides').textContent = formatCurrency(pestCost);
    if (document.getElementById('val-rentals')) document.getElementById('val-rentals').textContent = formatCurrency(rentCost);
    if (document.getElementById('val-labor')) document.getElementById('val-labor').textContent = formatCurrency(laborCost);
    if (document.getElementById('val-water')) document.getElementById('val-water').textContent = formatCurrency(waterCost);
    if (document.getElementById('val-misc')) document.getElementById('val-misc').textContent = formatCurrency(miscCost);

    // Core Agronomic Math
    const totalCost = fertCost + pestCost + rentCost + laborCost + waterCost + miscCost;
    const totalYieldTons = (plantCount * bunchWeight) / 1000;
    const grossRevenue = totalYieldTons * pricePerTon;
    const netProfit = grossRevenue - totalCost;
    const roiPct = totalCost > 0 ? ((netProfit / totalCost) * 100) : 0;
    const costPerPlant = plantCount > 0 ? (totalCost / plantCount) : 0;

    // Update KPI Cards
    const kpiTotalCost = document.getElementById('kpi-total-cost');
    const kpiCostPerPlant = document.getElementById('kpi-cost-per-plant');
    const kpiEstYield = document.getElementById('kpi-est-yield');
    const kpiYieldPerPlant = document.getElementById('kpi-yield-per-plant');
    const kpiNetProfit = document.getElementById('kpi-net-profit');
    const kpiProfitStatus = document.getElementById('kpi-profit-status');
    const kpiRoi = document.getElementById('kpi-roi');
    const kpiRoiFill = document.getElementById('kpi-roi-fill');

    if (kpiTotalCost) kpiTotalCost.textContent = formatCurrency(totalCost);
    if (kpiCostPerPlant) kpiCostPerPlant.textContent = `₹${Math.round(costPerPlant)} / plant`;

    if (kpiEstYield) kpiEstYield.textContent = `${totalYieldTons.toFixed(1)} T`;
    if (kpiYieldPerPlant) kpiYieldPerPlant.textContent = `${bunchWeight} kg / plant`;

    if (kpiNetProfit) {
        kpiNetProfit.textContent = formatCurrency(netProfit);
        if (netProfit < 0) {
            kpiNetProfit.style.color = '#d32f2f';
            if (kpiProfitStatus) {
                kpiProfitStatus.textContent = '⚠️ Operating Loss Warning';
                kpiProfitStatus.style.color = '#d32f2f';
            }
        } else {
            kpiNetProfit.style.color = '#2e7d32';
            if (kpiProfitStatus) {
                kpiProfitStatus.textContent = '🟢 Favorable Net Profit Margin';
                kpiProfitStatus.style.color = '#2e7d32';
            }
        }
    }

    if (kpiRoi) kpiRoi.textContent = `${roiPct.toFixed(1)}%`;
    if (kpiRoiFill) {
        const fillWidth = Math.min(100, Math.max(0, roiPct / 2)); // 200% ROI = 100% bar
        kpiRoiFill.style.width = `${fillWidth}%`;
        kpiRoiFill.style.background = roiPct < 0 ? '#d32f2f' : 'linear-gradient(90deg, #4caf50, #2e7d32)';
    }

    // Render Charts
    renderCharts(totalCost, grossRevenue, netProfit, {
        fertCost, pestCost, rentCost, laborCost, waterCost, miscCost
    });
}

function renderCharts(totalCost, grossRevenue, netProfit, expenses) {
    if (typeof Chart === 'undefined') return;

    // 1. Budget & Revenue Visualizer Bar Chart
    const ctxRoi = document.getElementById('roiChart')?.getContext('2d');
    if (ctxRoi) {
        if (roiChartInstance) roiChartInstance.destroy();

        roiChartInstance = new Chart(ctxRoi, {
            type: 'bar',
            data: {
                labels: ['Total Investment', 'Gross Revenue', 'Net Profit'],
                datasets: [{
                    label: 'Amount (₹)',
                    data: [totalCost, grossRevenue, Math.max(0, netProfit)],
                    backgroundColor: [
                        'rgba(244, 67, 54, 0.85)',
                        'rgba(33, 150, 243, 0.85)',
                        'rgba(76, 175, 80, 0.85)'
                    ],
                    borderColor: [
                        '#d32f2f',
                        '#1976d2',
                        '#388e3c'
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
                                return ' ₹' + ctx.parsed.y.toLocaleString('en-IN');
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            color: '#000000',
                            callback: function(val) {
                                return '₹' + (val / 1000) + 'k';
                            },
                            font: { family: 'Outfit', weight: '800', size: 12 }
                        },
                        grid: { color: 'rgba(0, 0, 0, 0.1)' }
                    },
                    x: {
                        ticks: {
                            color: '#000000',
                            font: { family: 'Outfit', weight: '800', size: 13 }
                        },
                        grid: { color: 'rgba(0, 0, 0, 0.05)' }
                    }
                }
            }
        });
    }

    // 2. Expense Breakdown Share Doughnut Chart
    const ctxExpense = document.getElementById('expenseChart')?.getContext('2d');
    if (ctxExpense) {
        if (expenseChartInstance) expenseChartInstance.destroy();

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
                            font: { family: 'Outfit', weight: '800', size: 14 },
                            padding: 12,
                            boxWidth: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(ctx) {
                                const val = ctx.parsed;
                                return ` ${ctx.label}: ₹${val.toLocaleString('en-IN')}`;
                            }
                        }
                    }
                }
            }
        });
    }
}
