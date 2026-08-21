// Global function immediately available for form analysis
window.handleAnalyzeSuitability = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    
    const stateSelectEl = document.getElementById('state-select');
    const districtSelectEl = document.getElementById('district-select');
    const monthSelectEl = document.getElementById('month-select');
    const selectedVariantName = localStorage.getItem('microsun_selected_variant_name') || 'Grand Naine (G9)';

    const state = (stateSelectEl && stateSelectEl.value) ? stateSelectEl.value : '';
    const district = (districtSelectEl && districtSelectEl.value) ? districtSelectEl.value : '';
    const month = (monthSelectEl && monthSelectEl.value) ? monthSelectEl.value : '';

    // Strict validation check
    if (!state || !district || !month) {
        alert("Please select a State, District, and Planting Month first before running the AI analysis!");
        return;
    }

    let result = {
        score: 50,
        decision: "NOT RECOMMENDED / HIGH RISK",
        badgeColor: "#D32F2F",
        reasonClimate: "Loading suitability report...",
        reasonWater: "Loading suitability report...",
        reasonHistory: "Loading suitability report...",
        reasonMonth: "Loading suitability report...",
        alternative: "Evaluating...",
        verdict: "Evaluating...",
        climate: "Evaluating...",
        note: ""
    };

    if (typeof climateData !== 'undefined' && climateData.getSuitability) {
        result = climateData.getSuitability(selectedVariantName, state, district, month);
    }

    // Populate Option A: Decision Badge & Score Meter
    const badge = document.getElementById('r-decision-badge');
    if (badge) {
        badge.textContent = result.decision;
        badge.style.background = result.badgeColor || '#2E7D32';
        badge.style.color = '#FFFFFF';
    }

    const scorePercent = document.getElementById('r-score-percent');
    const scoreBar = document.getElementById('r-score-bar');
    const matchLabel = document.getElementById('r-match-label');
    if (scorePercent) {
        scorePercent.textContent = `${result.score}%`;
        scorePercent.style.color = result.badgeColor || '#2E7D32';
    }
    if (scoreBar) {
        scoreBar.style.width = `${result.score}%`;
        scoreBar.style.background = result.badgeColor || '#2E7D32';
    }
    if (matchLabel) {
        matchLabel.textContent = `${result.score}% Optimal Alignment based on 10-Yr Data`;
    }

    // Populate Option B: 3 Key Agronomic Reasons
    const reasonClimateEl = document.getElementById('r-reason-climate');
    const reasonWaterEl = document.getElementById('r-reason-water');
    const reasonHistoryEl = document.getElementById('r-reason-history');
    if (reasonClimateEl) reasonClimateEl.textContent = result.reasonClimate;
    if (reasonWaterEl) reasonWaterEl.textContent = result.reasonWater;
    if (reasonHistoryEl) reasonHistoryEl.textContent = result.reasonHistory;

    // Populate Month & Alternative Recommendations
    const reasonMonthEl = document.getElementById('r-reason-month');
    const alternativeEl = document.getElementById('r-alternative');
    if (reasonMonthEl) reasonMonthEl.innerHTML = result.reasonMonth;
    if (alternativeEl) alternativeEl.textContent = result.alternative;

    // Populate Agronomic Profile & Final Verdict
    const noteEl = document.getElementById('r-note');
    const verdictEl = document.getElementById('r-verdict');
    if (noteEl) noteEl.innerHTML = result.note.replace(/\n/g, '<br>');
    if (verdictEl) verdictEl.textContent = result.verdict;

    // Save region selections
    localStorage.setItem('microsun_selected_state', state);
    localStorage.setItem('microsun_selected_district', district);
    localStorage.setItem('microsun_selected_month', month);
    localStorage.setItem('microsun_suitability_score', result.score);

    // Save to Firebase Firestore if available
    try {
        if (typeof db !== 'undefined' && db) {
            const currentUser = JSON.parse(localStorage.getItem('microsun_current_user') || '{}');
            if (currentUser.phone) {
                db.collection('users').doc(currentUser.phone).set({
                    selectedState: state,
                    selectedDistrict: district,
                    selectedMonth: month,
                    suitabilityScore: result.score,
                    updatedAt: new Date().toISOString()
                }, { merge: true });
            }
        }
    } catch (err) {
        console.warn("Firestore sync skipped:", err.message);
    }

    // Reveal Report Card
    const repCard = document.getElementById('report-card');
    if (repCard) {
        repCard.style.display = 'block';
        repCard.classList.remove('hidden');
        repCard.scrollIntoView({ behavior: 'smooth' });
    }
};

// Reusable Helper to Sync & Build Custom Glassmorphism Dropdowns
function syncCustomSelect(selectId) {
    const selectEl = document.getElementById(selectId);
    if (!selectEl) return;

    let wrapper = document.getElementById(selectId + '-custom-wrapper');
    if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.className = 'custom-select-wrapper';
        wrapper.id = selectId + '-custom-wrapper';
        selectEl.style.display = 'none'; // Hide native select
        selectEl.parentNode.insertBefore(wrapper, selectEl.nextSibling);
    }

    wrapper.innerHTML = '';
    wrapper.className = 'custom-select-wrapper' + (selectEl.disabled ? ' disabled' : '');

    // 1. Create Dropdown Trigger Box
    const trigger = document.createElement('div');
    trigger.className = 'custom-select-trigger';
    trigger.style.cursor = selectEl.disabled ? 'not-allowed' : 'pointer';

    const triggerText = document.createElement('span');
    triggerText.className = 'trigger-text';
    
    const selectedOpt = selectEl.options[selectEl.selectedIndex];
    if (selectedOpt) {
        triggerText.textContent = selectedOpt.textContent;
        if (selectEl.value === "") {
            triggerText.classList.add('placeholder');
        }
    } else {
        triggerText.textContent = 'Select';
        triggerText.classList.add('placeholder');
    }

    const arrow = document.createElement('div');
    arrow.className = 'trigger-arrow';

    trigger.appendChild(triggerText);
    trigger.appendChild(arrow);
    wrapper.appendChild(trigger);

    // 2. Create Options Panel (Opens downwards)
    const optionsPanel = document.createElement('div');
    optionsPanel.className = 'custom-select-options';

    Array.from(selectEl.options).forEach(opt => {
        if (opt.value === "") return; // Skip placeholder

        const optDiv = document.createElement('div');
        optDiv.className = 'custom-option';
        optDiv.textContent = opt.textContent;
        optDiv.setAttribute('data-value', opt.value);

        optDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            selectEl.value = opt.value;
            
            // Fire change listener on native element
            selectEl.dispatchEvent(new Event('change'));
            
            syncCustomSelect(selectId);
            
            optionsPanel.style.display = 'none';
            wrapper.classList.remove('open');
        });

        optionsPanel.appendChild(optDiv);
    });

    wrapper.appendChild(optionsPanel);

    // 3. Attach click event to trigger
    if (!selectEl.disabled) {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Close other open dropdowns
            document.querySelectorAll('.custom-select-options').forEach(p => {
                if (p !== optionsPanel) p.style.display = 'none';
            });
            document.querySelectorAll('.custom-select-wrapper').forEach(w => {
                if (w !== wrapper) w.classList.remove('open');
            });

            const isOpen = wrapper.classList.toggle('open');
            optionsPanel.style.display = isOpen ? 'block' : 'none';
        });
    }
}

// DOMContentLoaded setup for page elements
document.addEventListener('DOMContentLoaded', () => {
    const stateSelect = document.getElementById('state-select');
    const districtSelect = document.getElementById('district-select');
    const monthSelect = document.getElementById('month-select');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const proceedBtn = document.getElementById('proceedBtn');
    const variantDisplay = document.getElementById('selected-variant-display');

    const selectedVariantName = localStorage.getItem('microsun_selected_variant_name') || 'Grand Naine (G9)';
    if (variantDisplay) {
        variantDisplay.textContent = 'Selected Crop: ' + selectedVariantName;
        variantDisplay.style.display = 'inline-block';
    }

    // Populate States Dropdown
    if (stateSelect && typeof indianDistrictsData !== 'undefined' && indianDistrictsData.states) {
        stateSelect.innerHTML = '<option value="" disabled selected>Select State</option>';
        indianDistrictsData.states.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.state;
            opt.textContent = s.state;
            stateSelect.appendChild(opt);
        });
    }

    // Initialize custom dropdowns on load
    syncCustomSelect('state-select');
    syncCustomSelect('district-select');
    syncCustomSelect('month-select');

    // Handle State Change -> Populate Districts
    if (stateSelect && districtSelect) {
        stateSelect.addEventListener('change', () => {
            const stateName = stateSelect.value;
            districtSelect.innerHTML = '<option value="" disabled selected>Select District</option>';
            districtSelect.disabled = true;

            if (typeof indianDistrictsData !== 'undefined') {
                const foundState = indianDistrictsData.states.find(s => s.state === stateName);
                if (foundState && foundState.districts) {
                    foundState.districts.forEach(d => {
                        const opt = document.createElement('option');
                        opt.value = d;
                        opt.textContent = d;
                        districtSelect.appendChild(opt);
                    });
                    districtSelect.disabled = false;
                }
            }
            // Re-sync district dropdown display
            syncCustomSelect('district-select');
            checkFormValidity();
        });
    }

    // Monitor value selection for district and month to re-sync display text
    if (districtSelect) {
        districtSelect.addEventListener('change', () => {
            syncCustomSelect('district-select');
            checkFormValidity();
        });
    }

    if (monthSelect) {
        monthSelect.addEventListener('change', () => {
            syncCustomSelect('month-select');
            checkFormValidity();
        });
    }

    // Close all open dropdown panels when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.custom-select-options').forEach(p => p.style.display = 'none');
        document.querySelectorAll('.custom-select-wrapper').forEach(w => w.classList.remove('open'));
    });

    // Validation monitoring to dynamically toggle Analyze Button state
    function checkFormValidity() {
        if (stateSelect && districtSelect && monthSelect && analyzeBtn) {
            const hasState = stateSelect.value !== "";
            const hasDistrict = districtSelect.value !== "" && !districtSelect.disabled;
            const hasMonth = monthSelect.value !== "";

            if (hasState && hasDistrict && hasMonth) {
                analyzeBtn.disabled = false;
                analyzeBtn.classList.remove('disabled');
                analyzeBtn.style.opacity = '1';
                analyzeBtn.style.pointerEvents = 'auto';
                analyzeBtn.style.cursor = 'pointer';
            } else {
                analyzeBtn.disabled = true;
                analyzeBtn.classList.add('disabled');
                analyzeBtn.style.opacity = '0.5';
                analyzeBtn.style.pointerEvents = 'none';
                analyzeBtn.style.cursor = 'not-allowed';
            }
        }
    }
    
    // Set initial button state to disabled
    checkFormValidity();

    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', window.handleAnalyzeSuitability);
    }

    // Handle Proceed Button Click -> Navigate to Sky Intel AI
    if (proceedBtn) {
        proceedBtn.addEventListener('click', (e) => {
            e.preventDefault();
            proceedBtn.textContent = 'Loading Climate Intelligence...';
            setTimeout(() => {
                window.location.href = 'climate_risk.html';
            }, 300);
        });
    }
});
