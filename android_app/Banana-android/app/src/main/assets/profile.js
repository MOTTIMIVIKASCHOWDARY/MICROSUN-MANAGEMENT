// User Profile & Agri-Enterprise Control Engine - MICROSUN AI

document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();
    setupTabSwitching();
    setupHamburgerMenu();
});

// Setup Hamburger Menu Logic (Managed globally by script.js)
function setupHamburgerMenu() {
}

function toggleSidebarMenu(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const menuToggle = document.getElementById('menuToggle');
    const mainSidebar = document.getElementById('mainSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    const isOpen = mainSidebar ? mainSidebar.classList.contains('open') : false;

    if (isOpen) {
        if (menuToggle) menuToggle.classList.remove('open');
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('open');
            sidebarOverlay.style.display = 'none';
            sidebarOverlay.style.opacity = '0';
            sidebarOverlay.style.pointerEvents = 'none';
        }
        if (mainSidebar) {
            mainSidebar.classList.remove('open');
            mainSidebar.style.transform = 'translateX(-100%)';
        }
    } else {
        if (menuToggle) menuToggle.classList.add('open');
        if (sidebarOverlay) {
            sidebarOverlay.classList.add('open');
            sidebarOverlay.style.display = 'block';
            sidebarOverlay.style.opacity = '1';
            sidebarOverlay.style.pointerEvents = 'auto';
        }
        if (mainSidebar) {
            mainSidebar.classList.add('open');
            mainSidebar.style.transform = 'translateX(0)';
        }
    }
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

// Load User Profile Data from localStorage with Smart Defaults
function loadUserProfile() {
    let currUser = null;
    try {
        const raw = localStorage.getItem('microsun_current_user') || localStorage.getItem('microsun_currentUser');
        if (raw) currUser = JSON.parse(raw);
    } catch (e) {}

    const name = (currUser && (currUser.name || currUser.fullName)) ? (currUser.name || currUser.fullName) : (localStorage.getItem('microsun_fullName') || 'Ramesh Kumar');
    const role = (currUser && currUser.role) ? currUser.role : (localStorage.getItem('microsun_user_role') || 'Farmer');
    const phone = (currUser && currUser.phone) ? currUser.phone : (localStorage.getItem('microsun_mobileNumber') || localStorage.getItem('microsun_user_phone') || '9842109876');
    const countryCode = localStorage.getItem('microsun_countryCode') || '+91';
    const lang = localStorage.getItem('microsun_lang') || 'en';
    const state = (currUser && currUser.state) ? currUser.state : (localStorage.getItem('microsun_state') || 'Tamil Nadu');
    const district = localStorage.getItem('microsun_district') || 'Trichy / Lalgudi';

    const farmSize = (currUser && currUser.farmSize) ? currUser.farmSize : (localStorage.getItem('microsun_farmSize') || '12.5');
    const cropVariety = localStorage.getItem('microsun_selected_variant') || 'Grand Naine (G9)';
    const soilType = (currUser && currUser.soilType) ? currUser.soilType : (localStorage.getItem('microsun_soilType') || 'clay_loam');
    const irrigation = localStorage.getItem('microsun_irrigation') || 'drip';
    const plantingDate = localStorage.getItem('microsun_planting_date') || '2025-10-15';
    const harvestDate = localStorage.getItem('microsun_harvest_date') || '2026-08-01';

    const cleanNameSlug = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const upiId = (currUser && currUser.upi) ? currUser.upi : (localStorage.getItem('microsun_upi_id') || `${cleanNameSlug || 'farmer'}@upi`);
    const bankAcc = localStorage.getItem('microsun_bank_acc') || '918237465012';
    const ifsc = localStorage.getItem('microsun_ifsc') || 'SBIN0004812';
    const bankName = localStorage.getItem('microsun_bank_name') || 'State Bank of India - Trichy';

    const giTag = localStorage.getItem('microsun_gi_tag') || 'Sirumalai Hill GI Tag';
    const organicCert = localStorage.getItem('microsun_organic_cert') || 'APEDA Organic Certified';
    const fssai = localStorage.getItem('microsun_fssai') || '10020042000123';

    const smsAlerts = localStorage.getItem('microsun_sms_enabled') !== 'false';

    // Set Form Fields
    if (document.getElementById('profFullName')) document.getElementById('profFullName').value = name;
    if (document.getElementById('profUserRole')) document.getElementById('profUserRole').value = role;
    if (document.getElementById('profCountryCode')) document.getElementById('profCountryCode').value = countryCode;
    if (document.getElementById('profMobileNumber')) document.getElementById('profMobileNumber').value = phone;
    if (document.getElementById('profLang')) document.getElementById('profLang').value = lang;
    if (document.getElementById('profState')) document.getElementById('profState').value = state;
    if (document.getElementById('profDistrict')) document.getElementById('profDistrict').value = district;

    if (document.getElementById('profFarmSize')) document.getElementById('profFarmSize').value = farmSize;
    if (document.getElementById('profCropVariety')) document.getElementById('profCropVariety').value = cropVariety;
    if (document.getElementById('profSoilType')) document.getElementById('profSoilType').value = soilType;
    if (document.getElementById('profIrrigation')) document.getElementById('profIrrigation').value = irrigation;
    if (document.getElementById('profPlantingDate')) document.getElementById('profPlantingDate').value = plantingDate;
    if (document.getElementById('profHarvestDate')) document.getElementById('profHarvestDate').value = harvestDate;

    if (document.getElementById('profUpiId')) document.getElementById('profUpiId').value = upiId;
    if (document.getElementById('profBankAcc')) document.getElementById('profBankAcc').value = bankAcc;
    if (document.getElementById('profIfsc')) document.getElementById('profIfsc').value = ifsc;
    if (document.getElementById('profBankName')) document.getElementById('profBankName').value = bankName;

    if (document.getElementById('profGiTag')) document.getElementById('profGiTag').value = giTag;
    if (document.getElementById('profOrganicCert')) document.getElementById('profOrganicCert').value = organicCert;
    if (document.getElementById('profFssai')) document.getElementById('profFssai').value = fssai;

    if (document.getElementById('chkSmsAlerts')) document.getElementById('chkSmsAlerts').checked = smsAlerts;

    // Update Digital Identity Pass Live Display
    updateDigitalPassportCard();
}

// Setup Tab Switching Logic
function setupTabSwitching() {
    const tabs = document.querySelectorAll('.prof-tab-btn');
    const sections = document.querySelectorAll('.prof-tab-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.style.display = 'none');

            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });
}

// Live Update of Digital Identity Passport Card
function updateDigitalPassportCard() {
    const name = document.getElementById('profFullName') ? document.getElementById('profFullName').value.trim() : 'Ramesh Kumar';
    const role = document.getElementById('profUserRole') ? document.getElementById('profUserRole').value : 'Farmer';
    const countryCode = document.getElementById('profCountryCode') ? document.getElementById('profCountryCode').value : '+91';
    const phone = document.getElementById('profMobileNumber') ? document.getElementById('profMobileNumber').value.trim() : '9842109876';
    const state = document.getElementById('profState') ? document.getElementById('profState').value : 'Tamil Nadu';
    const district = document.getElementById('profDistrict') ? document.getElementById('profDistrict').value.trim() : 'Trichy';
    const farmSize = document.getElementById('profFarmSize') ? document.getElementById('profFarmSize').value.trim() : '12.5';
    const variety = document.getElementById('profCropVariety') ? document.getElementById('profCropVariety').value : 'Grand Naine (G9)';
    const upi = document.getElementById('profUpiId') ? document.getElementById('profUpiId').value.trim() : 'ramesh.farmer@upi';

    // Compute Dynamic Verified Farmer ID based on State and Mobile Number
    let stateCode = 'TN';
    if (state.includes('Karnataka')) stateCode = 'KA';
    else if (state.includes('Kerala')) stateCode = 'KL';
    else if (state.includes('Andhra')) stateCode = 'AP';
    else if (state.includes('Maharashtra')) stateCode = 'MH';
    else if (state.includes('Gujarat')) stateCode = 'GJ';
    else if (state.includes('Uttar')) stateCode = 'UP';
    else if (state.includes('Bihar')) stateCode = 'BR';
    else if (state.includes('West Bengal')) stateCode = 'WB';
    else if (state.includes('Odisha')) stateCode = 'OR';
    else if (state.includes('Telangana')) stateCode = 'TS';
    else if (state.includes('Punjab')) stateCode = 'PB';
    else if (state.includes('Haryana')) stateCode = 'HR';
    else if (state.includes('Madhya')) stateCode = 'MP';
    else if (state.includes('Rajasthan')) stateCode = 'RJ';
    else if (state.includes('Assam')) stateCode = 'AS';

    const lastDigits = phone.length >= 5 ? phone.slice(-5) : '98421';
    const dynamicFarmerId = `IND-${stateCode}-${lastDigits}`;

    // Header Avatar Text
    if (document.getElementById('headerUserName')) document.getElementById('headerUserName').textContent = name;
    if (document.getElementById('headerUserTitle')) document.getElementById('headerUserTitle').textContent = `🌾 Verified ${role} & Enterprise Owner`;

    // Load Saved User Photo if present
    const savedPhoto = localStorage.getItem('microsun_user_photo');
    if (savedPhoto) {
        if (document.getElementById('profAvatarImg')) document.getElementById('profAvatarImg').src = savedPhoto;
        if (document.getElementById('passAvatarImg')) document.getElementById('passAvatarImg').src = savedPhoto;
        if (document.getElementById('certAvatarImg')) document.getElementById('certAvatarImg').src = savedPhoto;
    }

    // Top 4 Hero Stat Cards
    if (document.getElementById('statValFarmerId')) document.getElementById('statValFarmerId').textContent = dynamicFarmerId;
    if (document.getElementById('statValFarm')) document.getElementById('statValFarm').textContent = `${farmSize} Acres`;
    if (document.getElementById('statValRating')) document.getElementById('statValRating').textContent = '4.9 / 5.0 ⭐';
    if (document.getElementById('statValInsurance')) document.getElementById('statValInsurance').textContent = 'Active 2026';

    // Digital Identity Passport Card Display
    if (document.getElementById('passName')) document.getElementById('passName').textContent = name;
    if (document.getElementById('passRole')) document.getElementById('passRole').textContent = `🌾 ${role} • Verified Enterprise`;
    if (document.getElementById('passMobile')) document.getElementById('passMobile').textContent = `${countryCode} ${phone}`;
    if (document.getElementById('passState')) document.getElementById('passState').textContent = state;
    if (document.getElementById('passFarm')) document.getElementById('passFarm').textContent = `${farmSize} Acres`;
    if (document.getElementById('passVariety')) document.getElementById('passVariety').textContent = variety;
    if (document.getElementById('passUpi')) document.getElementById('passUpi').textContent = upi;

    // Agri-Pass Certificate Modal Display
    if (document.getElementById('certName')) document.getElementById('certName').textContent = name;
    if (document.getElementById('certRole')) document.getElementById('certRole').textContent = `${role} (Agricultural Producer)`;
    if (document.getElementById('certMobile')) document.getElementById('certMobile').textContent = `${countryCode} ${phone}`;
    if (document.getElementById('certState')) document.getElementById('certState').textContent = `${state} (${district})`;
    if (document.getElementById('certLand')) document.getElementById('certLand').textContent = `${farmSize} Acres`;
    if (document.getElementById('certVariety')) document.getElementById('certVariety').textContent = variety;
    if (document.getElementById('certUpi')) document.getElementById('certUpi').textContent = upi;
}

// Profile Photo File Upload Handler
function handleProfilePhotoUpload(e) {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (PNG, JPG, JPEG, WEBP).');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const dataUrl = event.target.result;
        
        // Update all avatar images live
        const profAvatar = document.getElementById('profAvatarImg');
        const passAvatar = document.getElementById('passAvatarImg');
        const certAvatar = document.getElementById('certAvatarImg');

        if (profAvatar) profAvatar.src = dataUrl;
        if (passAvatar) passAvatar.src = dataUrl;
        if (certAvatar) certAvatar.src = dataUrl;

        // Save to localStorage
        localStorage.setItem('microsun_user_photo', dataUrl);
        console.log("📷 User profile photo updated and saved to localStorage!");
    };
    reader.readAsDataURL(file);
}

// Save User Profile to Firebase Firestore and localStorage
async function saveUserProfile(e) {
    if (e) e.preventDefault();

    const btn = document.querySelector('.btn-save-profile');
    if (btn) btn.textContent = 'Saving to Firebase Firestore...';

    const name = document.getElementById('profFullName') ? document.getElementById('profFullName').value.trim() : 'Ramesh Kumar';
    const role = document.getElementById('profUserRole') ? document.getElementById('profUserRole').value : 'Farmer';
    const countryCode = document.getElementById('profCountryCode') ? document.getElementById('profCountryCode').value : '+91';
    const phone = document.getElementById('profMobileNumber') ? document.getElementById('profMobileNumber').value.trim() : '9842109876';
    const lang = document.getElementById('profLang') ? document.getElementById('profLang').value : 'en';
    const state = document.getElementById('profState') ? document.getElementById('profState').value : 'Tamil Nadu';
    const district = document.getElementById('profDistrict') ? document.getElementById('profDistrict').value.trim() : 'Trichy';

    const farmSize = document.getElementById('profFarmSize') ? document.getElementById('profFarmSize').value.trim() : '12.5';
    const cropVariety = document.getElementById('profCropVariety') ? document.getElementById('profCropVariety').value : 'Grand Naine (G9)';
    const soilType = document.getElementById('profSoilType') ? document.getElementById('profSoilType').value : 'alluvial';
    const irrigation = document.getElementById('profIrrigation') ? document.getElementById('profIrrigation').value : 'drip';
    const plantingDate = document.getElementById('profPlantingDate') ? document.getElementById('profPlantingDate').value : '2025-10-15';
    const harvestDate = document.getElementById('profHarvestDate') ? document.getElementById('profHarvestDate').value : '2026-08-01';

    const upiId = document.getElementById('profUpiId') ? document.getElementById('profUpiId').value.trim() : `${phone}@upi`;
    const bankAcc = document.getElementById('profBankAcc') ? document.getElementById('profBankAcc').value.trim() : '';
    const ifsc = document.getElementById('profIfsc') ? document.getElementById('profIfsc').value.trim() : '';
    const bankName = document.getElementById('profBankName') ? document.getElementById('profBankName').value.trim() : '';

    const giTag = document.getElementById('profGiTag') ? document.getElementById('profGiTag').value : '';
    const organicCert = document.getElementById('profOrganicCert') ? document.getElementById('profOrganicCert').value : '';
    const fssai = document.getElementById('profFssai') ? document.getElementById('profFssai').value.trim() : '';

    const profileData = {
        name,
        fullName: name,
        role,
        countryCode,
        phone,
        lang,
        state,
        district,
        farmSize,
        cropVariety,
        soilType,
        irrigation,
        plantingDate,
        harvestDate,
        upiId,
        upi: upiId,
        bankAcc,
        ifsc,
        bankName,
        giTag,
        organicCert,
        fssai,
        updatedAt: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem('microsun_fullName', name);
    localStorage.setItem('microsun_user_role', role);
    localStorage.setItem('microsun_countryCode', countryCode);
    localStorage.setItem('microsun_mobileNumber', phone);
    localStorage.setItem('microsun_user_phone', phone);
    localStorage.setItem('microsun_lang', lang);
    localStorage.setItem('microsun_state', state);
    localStorage.setItem('microsun_district', district);
    localStorage.setItem('microsun_farmSize', farmSize);
    localStorage.setItem('microsun_selected_variant', cropVariety);
    localStorage.setItem('microsun_soilType', soilType);
    localStorage.setItem('microsun_irrigation', irrigation);
    localStorage.setItem('microsun_planting_date', plantingDate);
    localStorage.setItem('microsun_harvest_date', harvestDate);
    localStorage.setItem('microsun_upi_id', upiId);
    localStorage.setItem('microsun_bank_acc', bankAcc);
    localStorage.setItem('microsun_ifsc', ifsc);
    localStorage.setItem('microsun_bank_name', bankName);
    localStorage.setItem('microsun_gi_tag', giTag);
    localStorage.setItem('microsun_organic_cert', organicCert);
    localStorage.setItem('microsun_fssai', fssai);
    localStorage.setItem('microsun_current_user', JSON.stringify(profileData));

    // Save to Firebase Cloud Firestore Database
    if (typeof saveUserToFirestore === 'function') {
        await saveUserToFirestore(phone, profileData);
    }

    if (btn) btn.textContent = '💾 Save Profile';

    // Update Digital Pass
    updateDigitalPassportCard();

    // Show Confirmation Modal
    const modal = document.getElementById('profileSavedModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeProfileModal() {
    const modal = document.getElementById('profileSavedModal');
    if (modal) modal.style.display = 'none';
}

function downloadAgriPass() {
    const name = document.getElementById('profFullName') ? document.getElementById('profFullName').value : 'Ramesh Kumar';
    const role = document.getElementById('profUserRole') ? document.getElementById('profUserRole').value : 'Farmer';
    const countryCode = document.getElementById('profCountryCode') ? document.getElementById('profCountryCode').value : '+91';
    const phone = document.getElementById('profMobileNumber') ? document.getElementById('profMobileNumber').value : '9842109876';
    const state = document.getElementById('profState') ? document.getElementById('profState').value : 'Tamil Nadu';
    const district = document.getElementById('profDistrict') ? document.getElementById('profDistrict').value : 'Trichy / Lalgudi';
    const farmSize = document.getElementById('profFarmSize') ? document.getElementById('profFarmSize').value : '12.5';
    const variety = document.getElementById('profCropVariety') ? document.getElementById('profCropVariety').value : 'Grand Naine (G9)';
    const upi = document.getElementById('profUpiId') ? document.getElementById('profUpiId').value : 'ramesh.farmer@upi';

    if (document.getElementById('certName')) document.getElementById('certName').textContent = name;
    if (document.getElementById('certRole')) document.getElementById('certRole').textContent = role;
    if (document.getElementById('certMobile')) document.getElementById('certMobile').textContent = `${countryCode} ${phone}`;
    if (document.getElementById('certState')) document.getElementById('certState').textContent = `${state} (${district})`;
    if (document.getElementById('certLand')) document.getElementById('certLand').textContent = `${farmSize} Acres`;
    if (document.getElementById('certVariety')) document.getElementById('certVariety').textContent = variety;
    if (document.getElementById('certUpi')) document.getElementById('certUpi').textContent = upi;

    const modal = document.getElementById('agriPassModal');
    if (modal) modal.style.display = 'flex';
}

function closeAgriPassModal() {
    const modal = document.getElementById('agriPassModal');
    if (modal) modal.style.display = 'none';
}

function printAgriPassPDF() {
    window.print();
}

function resetProfileDefaults() {
    if (confirm("Are you sure you want to reset profile settings to default values?")) {
        localStorage.clear();
        loadUserProfile();
        alert("Profile settings have been reset to default values.");
    }
}
