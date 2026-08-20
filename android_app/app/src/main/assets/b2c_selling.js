// B2C Produce Selling - Direct Farmgate Marketplace Engine

const BANANA_VARIETIES_24 = [
    { name: "Grand Naine (G9) - Export Standard", alt: "Great Dwarf (G9)", icon: "🍌", tag: "Export Standard" },
    { name: "Robusta (Harichhal)", alt: "Commercial Leader", icon: "🍌", tag: "Commercial Leader" },
    { name: "Nendran (Ethakkaya) - Chips Grade", alt: "Nendran (Ethakia)", icon: "🍌", tag: "Chips Grade" },
    { name: "Red Banana (Seevazhai) - Premium", alt: "Red Banana", icon: "🍌", tag: "Premium Superfood" },
    { name: "Poovan (Mysore)", alt: "Traditional Table", icon: "🍌", tag: "Traditional Table" },
    { name: "Rasthali (Silk)", alt: "Sweet Aromatic", icon: "🍌", tag: "Sweet Aromatic" },
    { name: "Yelakki (Yelakkibale)", alt: "Cardamom (Elakki)", icon: "🍌", tag: "Mini Table" },
    { name: "Monthan (Raw Banana)", alt: "Cooking Grade", icon: "🍌", tag: "Cooking Grade" },
    { name: "Karpuravalli", alt: "High Sugar", icon: "🍌", tag: "High Sugar" },
    { name: "Pachanadan", alt: "Drought Tolerant", icon: "🍌", tag: "Drought Tolerant" },
    { name: "Sirumalai Hill GI Banana", alt: "GI Tag Certified", icon: "🍌", tag: "GI Tag Certified" },
    { name: "Giant Governor", alt: "High Yield", icon: "🍌", tag: "High Yield" },
    { name: "Ney Poovan (Elakki Bale)", alt: "Ghee Poovan (Elakki Bale)", icon: "🍌", tag: "Aromatic Fragrance" },
    { name: "Matti Banana (Kanyakumari GI)", alt: "Medicinal GI", icon: "🍌", tag: "Medicinal GI" },
    { name: "Champa (Desi Banana)", alt: "Eastern Desi", icon: "🍌", tag: "Eastern Desi" },
    { name: "Srimanti", alt: "Tissue Culture", icon: "🍌", tag: "Tissue Culture" },
    { name: "Kanthali", alt: "Regional Favorite", icon: "🍌", tag: "Regional Favorite" },
    { name: "Dwarf Cavendish", alt: "Global Benchmark", icon: "🍌", tag: "Global Benchmark" },
    { name: "Malbhog (Bihar Special)", alt: "Bihar GI Special", icon: "🍌", tag: "Bihar GI Special" },
    { name: "Grand Naine Export Class A+", alt: "Class A+ Export", icon: "🍌", tag: "Class A+ Export" },
    { name: "Virupakshi (Kodaikanal Hill)", alt: "Kodaikanal GI", icon: "🍌", tag: "Kodaikanal GI" },
    { name: "Kamalapur Red Banana", alt: "Karnataka GI Tag", icon: "🍌", tag: "Karnataka GI Tag" },
    { name: "Nanjanagud Rasabale", alt: "Nanjangud Rasabal", icon: "🍌", tag: "Heritage GI Tag" },
    { name: "Chengalikodan Nendran", alt: "Thrissur GI Tag", icon: "🍌", tag: "Thrissur GI Tag" }
];

const VERIFIED_BUYERS = [
    {
        id: "b1",
        name: "Reliance Fresh / Smart Bazaar",
        category: "Supermarket",
        avatar: "🏬",
        requiredVariety: "Grand Naine (G9) - Export Standard",
        minQty: "3.0 Tons",
        offeredPriceTon: 39500,
        offeredPriceKg: 39.5,
        location: "Koyambedu Hub, Chennai / Bengaluru",
        paymentTerm: "⚡ 100% Instant Escrow upon Quality Inspection",
        verifiedTag: "Verified Retail Giant",
        grade: "Grade A+ (Supermarket)"
    },
    {
        id: "b2",
        name: "BigBasket Direct Procure",
        category: "Supermarket",
        avatar: "🛒",
        requiredVariety: "Robusta (Harichhal)",
        minQty: "2.0 Tons",
        offeredPriceTon: 36800,
        offeredPriceKg: 36.8,
        location: "Whitefield, Bengaluru & Hyderabad",
        paymentTerm: "⚡ Same Day Bank Transfer",
        verifiedTag: "Verified E-Grocery",
        grade: "Grade A"
    },
    {
        id: "b3",
        name: "Hotels & Resorts Association (ITC & Taj)",
        category: "Hotel Chain",
        avatar: "🏨",
        requiredVariety: "Red Banana (Seevazhai) - Premium",
        minQty: "0.5 Tons",
        offeredPriceTon: 62000,
        offeredPriceKg: 62.0,
        location: "Trichy & Madurai / Chennai",
        paymentTerm: "⚡ Advance 50% + 50% on Loading",
        verifiedTag: "5-Star Hospitality",
        grade: "Grade A+ Premium"
    },
    {
        id: "b4",
        name: "Kerala Banana Chips & Snack Processors",
        category: "Processing",
        avatar: "🍟",
        requiredVariety: "Nendran (Ethakkaya) - Chips Grade",
        minQty: "5.0 Tons",
        offeredPriceTon: 48500,
        offeredPriceKg: 48.5,
        location: "Thrissur & Palakkad, Kerala",
        paymentTerm: "⚡ Direct UPI Escrow Payout",
        verifiedTag: "Export Snack Factory",
        grade: "Chips Grade A"
    },
    {
        id: "b5",
        name: "Saravana Bhavan Hotel Supply Network",
        category: "Hotel Chain",
        avatar: "🍲",
        requiredVariety: "Poovan (Mysore)",
        minQty: "1.5 Tons",
        offeredPriceTon: 34000,
        offeredPriceKg: 34.0,
        location: "Coimbatore & Trichy",
        paymentTerm: "⚡ Direct Bank Escrow",
        verifiedTag: "Chain Restaurant",
        grade: "Fresh Grade A"
    },
    {
        id: "b6",
        name: "Gulf & Middle East Agro Exporters Ltd",
        category: "Exporter",
        avatar: "🚢",
        requiredVariety: "Grand Naine (G9) - Export Standard",
        minQty: "10.0 Tons",
        offeredPriceTon: 42000,
        offeredPriceKg: 42.0,
        location: "JNPT Mumbai / Tuticorin Port",
        paymentTerm: "⚡ Letter of Credit / Instant Bank Transfer",
        verifiedTag: "Certified Exporter",
        grade: "Export Class A+"
    }
];

let activeBuyers = [...VERIFIED_BUYERS];
let currentTradeMode = 'SELL'; // 'SELL' or 'BUY'

document.addEventListener('DOMContentLoaded', () => {
    renderBuyers(activeBuyers);
    populateLogisticsOptions();
    renderVarietyDropdownOptions();

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
        const dd = document.getElementById('varietyDropdownMenu');
        const container = document.querySelector('.custom-dd-container');
        if (dd && container && !container.contains(e.target)) {
            dd.classList.remove('show');
        }
    });
});

/* ==========================================
   24 VARIETY CUSTOM DOWNWARD DROPDOWN LOGIC
   ========================================== */
function toggleVarietyDropdown(e) {
    if (e) e.stopPropagation();
    const dd = document.getElementById('varietyDropdownMenu');
    if (dd) {
        dd.classList.toggle('show');
        if (dd.classList.contains('show')) {
            renderVarietyDropdownOptions();
            const searchInp = document.getElementById('inpVarietySearch');
            if (searchInp) setTimeout(() => searchInp.focus(), 100);
        }
    }
}

function renderVarietyDropdownOptions() {
    const list = document.getElementById('varietyDropdownOptions');
    if (!list) return;

    const currentVal = document.getElementById('selCropVariety').value;

    list.innerHTML = BANANA_VARIETIES_24.map(v => `
        <div class="variety-opt-item ${v.name === currentVal ? 'selected' : ''}" onclick="selectVarietyOption('${v.name.replace(/'/g, "\\'")}')">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.1rem;">${v.icon}</span>
                <span>${v.name}</span>
            </div>
            <span style="font-size: 0.7rem; background: ${v.name === currentVal ? '#2e7d32' : 'rgba(0,0,0,0.08)'}; color: ${v.name === currentVal ? '#fff' : '#2e7d32'}; padding: 2px 6px; border-radius: 6px;">${v.tag}</span>
        </div>
    `).join('');
}

function filterVarietyDropdownList() {
    const q = (document.getElementById('inpVarietySearch').value || '').toLowerCase();
    const list = document.getElementById('varietyDropdownOptions');
    if (!list) return;

    const currentVal = document.getElementById('selCropVariety').value;

    const filtered = BANANA_VARIETIES_24.filter(v => v.name.toLowerCase().includes(q) || v.tag.toLowerCase().includes(q));

    if (filtered.length === 0) {
        list.innerHTML = `<div style="padding: 12px; text-align: center; font-weight: 800; color: #666;">No varieties found matching "${q}"</div>`;
        return;
    }

    list.innerHTML = filtered.map(v => `
        <div class="variety-opt-item ${v.name === currentVal ? 'selected' : ''}" onclick="selectVarietyOption('${v.name.replace(/'/g, "\\'")}')">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.1rem;">${v.icon}</span>
                <span>${v.name}</span>
            </div>
            <span style="font-size: 0.7rem; background: ${v.name === currentVal ? '#2e7d32' : 'rgba(0,0,0,0.08)'}; color: ${v.name === currentVal ? '#fff' : '#2e7d32'}; padding: 2px 6px; border-radius: 6px;">${v.tag}</span>
        </div>
    `).join('');
}

function selectVarietyOption(varietyName) {
    document.getElementById('selCropVariety').value = varietyName;
    const lbl = document.getElementById('lblSelectedVarietyText');
    if (lbl) {
        lbl.textContent = `🍌 ${varietyName}`;
    }
    const dd = document.getElementById('varietyDropdownMenu');
    if (dd) dd.classList.remove('show');
}

/* Modal Fallback functions */
function openVarietyModal() { toggleVarietyDropdown(); }
function closeVarietyModal() { const dd = document.getElementById('varietyDropdownMenu'); if (dd) dd.classList.remove('show'); }
function selectVarietyItem(name) { selectVarietyOption(name); }


/* ==========================================
   TRADE MODE & ROLE LOGIC
   ========================================== */
function switchTradeMode(mode) {
    currentTradeMode = mode;
    const btnSell = document.getElementById('btnModeSell');
    const btnBuy = document.getElementById('btnModeBuy');
    const submitBtn = document.getElementById('btnSubmitForm');
    const lblContactName = document.getElementById('lblContactName');
    const lblQuantity = document.getElementById('lblQuantity');
    const lblDirectPrice = document.getElementById('lblDirectPrice');
    const lblDate = document.getElementById('lblDate');
    const lblState = document.getElementById('lblState');

    if (mode === 'SELL') {
        if (btnSell) {
            btnSell.className = "mode-toggle-btn active";
            btnSell.style.background = "linear-gradient(135deg, #2e7d32, #1b5e20)";
            btnSell.style.color = "#ffffff";
            btnSell.style.boxShadow = "0 4px 15px rgba(46, 125, 50, 0.4)";
        }
        if (btnBuy) {
            btnBuy.className = "mode-toggle-btn";
            btnBuy.style.background = "transparent";
            btnBuy.style.color = "#000000";
            btnBuy.style.boxShadow = "none";
        }
        if (submitBtn) {
            submitBtn.textContent = "🚀 Publish Batch to Verified Buyers";
            submitBtn.style.background = "linear-gradient(135deg, #2e7d32, #1b5e20)";
        }
        if (lblContactName) lblContactName.textContent = "📝 Name of Seller";
        if (lblQuantity) lblQuantity.textContent = "Available Quantity (Tons)";
        if (lblDirectPrice) lblDirectPrice.textContent = "Direct Price (₹ / Ton)";
        if (lblDate) lblDate.textContent = "Harvest Readiness Date";
        if (lblState) lblState.textContent = "Farm Location State (16 States)";
    } else {
        // BUY Mode
        if (btnBuy) {
            btnBuy.className = "mode-toggle-btn active";
            btnBuy.style.background = "linear-gradient(135deg, #1565c0, #0d47a1)";
            btnBuy.style.color = "#ffffff";
            btnBuy.style.boxShadow = "0 4px 15px rgba(21, 101, 192, 0.4)";
        }
        if (btnSell) {
            btnSell.className = "mode-toggle-btn";
            btnSell.style.background = "transparent";
            btnSell.style.color = "#000000";
            btnSell.style.boxShadow = "none";
        }
        if (submitBtn) {
            submitBtn.textContent = "🛒 Post Direct Buying Order Requirement";
            submitBtn.style.background = "linear-gradient(135deg, #1565c0, #0d47a1)";
        }
        if (lblContactName) lblContactName.textContent = "📝 Name of Buyer";
        if (lblQuantity) lblQuantity.textContent = "Required Quantity (Tons)";
        if (lblDirectPrice) lblDirectPrice.textContent = "Target Buying Price (₹ / Ton)";
        if (lblDate) lblDate.textContent = "Required Delivery Deadline Date";
        if (lblState) lblState.textContent = "Delivery Destination State (16 States)";
    }

    populateLogisticsOptions();
}

function populateLogisticsOptions() {
    const selLogistics = document.getElementById('selLogisticsMode');
    if (!selLogistics) return;

    if (currentTradeMode === 'SELL') {
        selLogistics.innerHTML = `
            <option value="Buyer Pickup">🚜 Farmgate Pickup (Buyer Logistics Arranged)</option>
            <option value="Self Transport">🚛 Farmer Self-Transport to Hub (+₹1,200/Ton Bonus)</option>
            <option value="Cold Express">❄️ Express Cold Chain Refrigerated Container</option>
            <option value="Doorstep Delivery">📦 Doorstep Delivery to Buyer Warehouse</option>
        `;
    } else {
        selLogistics.innerHTML = `
            <option value="Buyer Arranged Pickup">🚛 Buyer Arranged Truck Pickup at Farmgate</option>
            <option value="Direct Warehouse Delivery">🏬 Direct Delivery to Supermarket / Factory Warehouse</option>
            <option value="Cold Storage Transit">❄️ Refrigerated Cold Storage Transit Container</option>
            <option value="Port Export Delivery">🚢 Port / Export Dock Direct Container Delivery</option>
        `;
    }
}

function handleRoleChange() {
    const role = document.getElementById('selUserRole').value;
    const nameInput = document.getElementById('inpContactName');
    if (!nameInput) return;

    if (role === 'Farmer') {
        nameInput.value = "Ramesh Kumar (Farmer)";
    } else if (role === 'Fresh / Smart Bazaar') {
        nameInput.value = "Reliance Procurement Officer";
    } else if (role === 'Hotels & Resorts Association') {
        nameInput.value = "ITC / Taj Group Executive Chef";
    } else if (role === 'Chips & Snack Processors') {
        nameInput.value = "Kerala Banana Processing Manager";
    } else if (role === 'Gulf & Middle East Agro Exporters') {
        nameInput.value = "Gulf Trade Export Director";
    } else {
        nameInput.value = `${role} Representative`;
    }
}


/* ==========================================
   BUYERS MARKETPLACE GRID & ORDER PLACEMENT
   ========================================== */
function renderBuyers(buyersList) {
    const grid = document.getElementById('buyerCardsGrid');
    const countSpan = document.getElementById('buyerCount');
    if (!grid) return;

    if (countSpan) countSpan.textContent = buyersList.length;

    if (buyersList.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2rem; background: rgba(255,255,255,0.3); border-radius: 16px; font-weight: 800;">
                No orders found for the selected category filter.
            </div>
        `;
        return;
    }

    grid.innerHTML = buyersList.map(buyer => {
        const isFarmerOffer = (buyer.tradeMode === 'SELL') || 
                              (buyer.category === 'Farmer Live Offer') || 
                              (buyer.verifiedTag && buyer.verifiedTag.includes('FARMER'));

        const isBuyMode = !isFarmerOffer;

        const badgeBg = isBuyMode 
            ? 'linear-gradient(135deg, #1565c0, #0d47a1)'  // BLUE for BUY Mode
            : 'linear-gradient(135deg, #2e7d32, #1b5e20)'; // GREEN for SELL Mode

        const tagBg = isBuyMode ? 'rgba(21, 101, 192, 0.15)' : 'rgba(46, 125, 50, 0.15)';
        const tagColor = isBuyMode ? '#0d47a1' : '#1b5e20';
        const cardBorder = isBuyMode ? 'rgba(21, 101, 192, 0.5)' : 'rgba(46, 125, 50, 0.5)';
        const btnBg = isBuyMode 
            ? 'linear-gradient(135deg, #1565c0, #0d47a1)' 
            : 'linear-gradient(135deg, #2e7d32, #1b5e20)';

        const btnText = isBuyMode 
            ? `⚡ Direct Sell to Buyer (₹ ${buyer.offeredPriceTon.toLocaleString()}/Ton)` 
            : `🛒 Direct Buy Offer (₹ ${buyer.offeredPriceTon.toLocaleString()}/Ton)`;

        // Clean short grade format
        let shortGrade = buyer.grade || 'Grade A';
        if (shortGrade.includes('Grade A+')) shortGrade = 'Grade A+';
        else if (shortGrade.includes('Grade A')) shortGrade = 'Grade A';
        else if (shortGrade.includes('Grade B')) shortGrade = 'Grade B';

        // Parse location state & pickup mode cleanly
        let locState = buyer.location || 'Pan India';
        let locPickup = 'Express Pickup';
        if (locState.includes('(')) {
            const parts = locState.split('(');
            locState = parts[0].trim();
            locPickup = parts[1].replace(')', '').trim();
        }

        // Clean contact person name (remove any (+91...) substring from contact name)
        let cleanContactPerson = buyer.contactName || buyer.name || 'Verified Representative';
        cleanContactPerson = cleanContactPerson.replace(/\s*\(\+?[0-9\s-]+\)/g, '').trim();
        if (cleanContactPerson.startsWith('Harvest Listing:') || cleanContactPerson.startsWith('Buying Order:')) {
            cleanContactPerson = cleanContactPerson.replace(/Harvest Listing:|Buying Order:/g, '').trim();
        }

        // Clean phone number (extract phone number cleanly)
        let cleanPhone = buyer.phone || buyer.mobileNumber || '';
        if (!cleanPhone && buyer.paymentTerm && buyer.paymentTerm.includes('(')) {
            const match = buyer.paymentTerm.match(/\(\+?[0-9\s-]+\)/);
            if (match) {
                cleanPhone = match[0].replace(/[()]/g, '').trim();
            }
        }
        if (!cleanPhone) cleanPhone = '+91 9842109876';

        // Format phone with country flag if not already present
        if (!cleanPhone.includes('🇮🇳') && cleanPhone.includes('+91')) {
            cleanPhone = '🇮🇳 ' + cleanPhone;
        }

        return `
            <div class="buyer-card" id="card_${buyer.id}" style="border: 1.8px solid ${cardBorder};">
                <div class="buyer-header">
                    <div class="buyer-avatar" style="background: ${tagBg};">${buyer.avatar}</div>
                    <div style="flex: 1;">
                        <h3 class="buyer-name">${buyer.name}</h3>
                        <span class="buyer-tag" style="background: ${tagBg}; color: ${tagColor}; font-weight: 900;">${buyer.verifiedTag}</span>
                    </div>
                    <div class="price-badge" style="background: ${badgeBg} !important; color: #ffffff !important; font-weight: 900; box-shadow: 0 4px 12px ${isBuyMode ? 'rgba(21,101,192,0.4)' : 'rgba(46,125,50,0.4)'};">
                        ₹ ${(buyer.offeredPriceTon / 1000).toFixed(1)}/Kg
                    </div>
                </div>

                <!-- Spacious 2-Column Grid Details Box -->
                <div class="buyer-details" style="background: rgba(255,255,255,0.72) !important; backdrop-filter: blur(12px); border: 1.5px solid rgba(255,255,255,0.9); border-radius: 16px; padding: 12px 14px; margin-bottom: 14px;">
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; border-bottom: 1.5px dashed rgba(0,0,0,0.12); padding-bottom: 10px; margin-bottom: 10px;">
                        <div>
                            <span style="font-size: 0.74rem; font-weight: 900; color: #555555; text-transform: uppercase; display: block; margin-bottom: 2px;">🌾 Variety</span>
                            <span style="font-size: 0.92rem; font-weight: 900; color: ${isBuyMode ? '#0d47a1' : '#1b5e20'};">${buyer.requiredVariety}</span>
                        </div>
                        <div>
                            <span style="font-size: 0.74rem; font-weight: 900; color: #555555; text-transform: uppercase; display: block; margin-bottom: 2px;">📦 Order Volume</span>
                            <span style="font-size: 0.92rem; font-weight: 900; color: #000000;">${buyer.minQty} <span style="font-size: 0.72rem; background: ${tagBg}; color: ${tagColor}; padding: 2px 6px; border-radius: 6px; font-weight: 900; margin-left: 3px;">${shortGrade}</span></span>
                        </div>
                        <div>
                            <span style="font-size: 0.74rem; font-weight: 900; color: #555555; text-transform: uppercase; display: block; margin-bottom: 2px;">📍 Location State</span>
                            <span style="font-size: 0.88rem; font-weight: 900; color: #000000;">${locState}</span>
                        </div>
                        <div>
                            <span style="font-size: 0.74rem; font-weight: 900; color: #555555; text-transform: uppercase; display: block; margin-bottom: 2px;">🚚 Logistics</span>
                            <span style="font-size: 0.88rem; font-weight: 900; color: #000000;">${locPickup}</span>
                        </div>
                    </div>

                    <!-- Clean 3-Row Contact & Escrow Details Box -->
                    <div style="background: rgba(255, 255, 255, 0.95); border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 10px 12px; font-size: 0.84rem; font-weight: 800; color: #222222; display: flex; flex-direction: column; gap: 6px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                            <span style="color: #555555; font-size: 0.78rem; font-weight: 900; text-transform: uppercase;">👤 Contact Person</span>
                            <span style="color: #000000; font-weight: 900; text-align: right;">${cleanContactPerson}</span>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; border-top: 1px dashed rgba(0,0,0,0.08); padding-top: 5px;">
                            <span style="color: #555555; font-size: 0.78rem; font-weight: 900; text-transform: uppercase;">📱 Mobile Number</span>
                            <span style="color: ${tagColor}; font-weight: 900; font-size: 0.9rem; text-align: right; font-family: monospace;">${cleanPhone}</span>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; border-top: 1px dashed rgba(0,0,0,0.08); padding-top: 5px;">
                            <span style="color: #555555; font-size: 0.78rem; font-weight: 900; text-transform: uppercase;">💳 Escrow Terms</span>
                            <span style="color: #1b5e20; font-weight: 900; font-size: 0.82rem; text-align: right;">⚡ 100% Guaranteed Escrow</span>
                        </div>
                    </div>

                </div>

                <button class="btn-sell-direct" onclick="executeOrderFulfillment('${buyer.id}', '${buyer.name.replace(/'/g, "\\'")}', '${buyer.requiredVariety.replace(/'/g, "\\'")}', ${buyer.offeredPriceTon}, '${buyer.minQty}')" style="background: ${btnBg} !important; color: #ffffff !important; box-shadow: 0 4px 15px ${isBuyMode ? 'rgba(21,101,192,0.4)' : 'rgba(46,125,50,0.4)'}; font-weight: 900;">
                    ${btnText}
                </button>
            </div>
        `;
    }).join('');
}

function filterBuyers() {
    const cat = document.getElementById('selFilterCategory').value;
    if (cat === 'ALL') {
        activeBuyers = [...VERIFIED_BUYERS];
    } else {
        activeBuyers = VERIFIED_BUYERS.filter(b => b.category === cat);
    }
    renderBuyers(activeBuyers);
}

function handleCreateListing(e) {
    e.preventDefault();
    
    const role = document.getElementById('selUserRole').value;
    const contactName = document.getElementById('inpContactName').value;
    const countryCode = document.getElementById('selCountryCode').value;
    const mobile = document.getElementById('inpMobileNumber').value;
    const variety = document.getElementById('selCropVariety').value;
    const grade = document.getElementById('selQualityGrade').value;
    const qty = document.getElementById('inpQuantityTons').value;
    const price = document.getElementById('inpDirectPriceTon').value;
    const date = document.getElementById('inpHarvestDate').value;
    const state = document.getElementById('selStateLocation').value;
    const logistics = document.getElementById('selLogisticsMode').value;

    const fullPhone = `${countryCode} ${mobile}`;
    const totalOrderVal = (parseFloat(qty) * parseFloat(price)).toLocaleString();
    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);

    // Create new live order object with tradeMode attached
    const newOrder = {
        id: orderId,
        tradeMode: currentTradeMode,
        name: `${currentTradeMode === 'SELL' ? 'Harvest Listing' : 'Buying Order'}: ${role}`,
        contactName: contactName,
        phone: fullPhone,
        category: currentTradeMode === 'SELL' ? 'Farmer Live Offer' : 'Buyer Requirement',
        avatar: currentTradeMode === 'SELL' ? '🌾' : '🛒',
        requiredVariety: variety,
        minQty: `${qty} Tons`,
        offeredPriceTon: parseFloat(price),
        offeredPriceKg: parseFloat(price) / 1000,
        location: `${state} (${logistics})`,
        paymentTerm: `⚡ 100% Escrow | Contact: ${contactName} (${fullPhone}) | Date: ${date}`,
        verifiedTag: currentTradeMode === 'SELL' ? 'FARMER LISTED LIVE' : 'BUYER ORDER LIVE',
        grade: grade
    };

    // Add to live array
    VERIFIED_BUYERS.unshift(newOrder);
    filterBuyers();

    // Populate and open Order Receipt Modal
    const rcptBox = document.getElementById('rcptDetailsBox');
    if (rcptBox) {
        rcptBox.innerHTML = `
            <div>🆔 <strong>Order Reference ID:</strong> ${orderId}</div>
            <div>👤 <strong>Role / Entity:</strong> ${role} (${contactName})</div>
            <div>📱 <strong>Mobile Contact:</strong> ${fullPhone}</div>
            <div>🍌 <strong>Banana Variety:</strong> ${variety}</div>
            <div>📦 <strong>Order Quantity:</strong> ${qty} Tons (${grade})</div>
            <div>💰 <strong>Rate:</strong> ₹ ${parseFloat(price).toLocaleString()} / Ton</div>
            <div>💵 <strong>TOTAL ORDER VALUE:</strong> <span style="color:#1b5e20; font-size:1.1rem; font-weight:900;">₹ ${totalOrderVal}</span></div>
            <div>🚚 <strong>Logistics Mode:</strong> ${logistics}</div>
            <div>🗺️ <strong>State Location:</strong> ${state}</div>
            <div>📅 <strong>Readiness / Deadline:</strong> ${date}</div>
            <div style="background:#c8e6c9; color:#1b5e20; padding:6px 10px; border-radius:8px; margin-top:4px;">⚡ STATUS: Live on B2C Marketplace & 100% Escrow Guaranteed</div>
        `;
    }

    const rcptTitle = document.getElementById('rcptTitle');
    if (rcptTitle) rcptTitle.textContent = currentTradeMode === 'SELL' ? 'Harvest Batch Listed Live!' : 'Direct Buying Order Placed!';

    const modal = document.getElementById('orderReceiptModal');
    if (modal) modal.style.display = 'flex';
}

function executeOrderFulfillment(id, name, variety, priceTon, qtyStr) {
    const qtyVal = parseFloat(qtyStr) || 5.0;
    const totalVal = (qtyVal * priceTon).toLocaleString();
    const orderId = "ORD-FLF-" + Math.floor(100000 + Math.random() * 900000);

    const contactName = document.getElementById('inpContactName').value || 'Authorized Trading Member';
    const countryCode = document.getElementById('selCountryCode').value || '+91';
    const mobile = document.getElementById('inpMobileNumber').value || '9842109876';

    const rcptBox = document.getElementById('rcptDetailsBox');
    if (rcptBox) {
        rcptBox.innerHTML = `
            <div>🆔 <strong>Contract Agreement ID:</strong> ${orderId}</div>
            <div>🏢 <strong>Counterparty Entity:</strong> ${name}</div>
            <div>👤 <strong>Trading Party:</strong> ${contactName} (${countryCode} ${mobile})</div>
            <div>🍌 <strong>Banana Variety:</strong> ${variety}</div>
            <div>📦 <strong>Contract Volume:</strong> ${qtyStr}</div>
            <div>💰 <strong>Agreed Price Rate:</strong> ₹ ${priceTon.toLocaleString()} / Ton</div>
            <div>💵 <strong>ESCROW CONTRACT TOTAL:</strong> <span style="color:#1b5e20; font-size:1.1rem; font-weight:900;">₹ ${totalVal}</span></div>
            <div>⚡ <strong>Status:</strong> Escrow Locked & Pickup Logistics Dispatched</div>
        `;
    }

    const rcptTitle = document.getElementById('rcptTitle');
    if (rcptTitle) rcptTitle.textContent = '🤝 Direct Trade Contract Executed!';

    const modal = document.getElementById('orderReceiptModal');
    if (modal) modal.style.display = 'flex';
}

function closeReceiptModal() {
    const modal = document.getElementById('orderReceiptModal');
    if (modal) modal.style.display = 'none';

    // Highlight top order card
    const firstCard = document.querySelector('.buyer-card');
    if (firstCard) {
        firstCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstCard.style.transition = 'all 0.5s ease';
        firstCard.style.border = '2.5px solid #2e7d32';
        firstCard.style.boxShadow = '0 0 30px rgba(46, 125, 50, 0.8)';
        setTimeout(() => {
            firstCard.style.border = '1.8px solid rgba(255, 255, 255, 0.6)';
            firstCard.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
        }, 2000);
    }
}
