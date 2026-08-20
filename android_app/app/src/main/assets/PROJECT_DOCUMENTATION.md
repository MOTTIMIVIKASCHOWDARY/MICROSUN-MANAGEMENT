# 📘 MICROSUN AI MANAGEMENT - FACULTY & EVALUATION PROJECT REPORT

**Project Name:** MICROSUN MANAGEMENT - Smart Banana Crop & Agri-Enterprise Management Platform  
**Target Crop:** Banana (*Musa acuminata* / *Musa balbisiana*)  
**Location / Focus:** Pan-India Agricultural Districts (Tamil Nadu, Maharashtra, Andhra Pradesh, Gujarat, Karnataka, Kerala, etc.)  
**Folder Location:** `c:\Users\unite\OneDrive\Desktop\PROJECTS\PDD`

---

## 1. Project Abstract & Objectives

**MICROSUN MANAGEMENT** is a full-stack precision agriculture system designed to solve key challenges faced by banana growers in India:
1. **Disease & Pest Prevention**: Real-time 3D AI scanning for Panama Wilt, Black Sigatoka, Bunchy Top, and Anthracnose.
2. **Climate Risk Intelligence**: 10-year historical climate analytics and district-level weather suitability scoring.
3. **Equipment & Labor Sharing**: Peer-to-peer machinery rental (tractors, harvesters, tillers) and crew booking via **Rentrox AI**.
4. **Financial Yield & ROI Analytics**: **Yexa AI** expense tracking, income projection, and net profit analysis per acre.
5. **APMC & Direct B2C Commerce**: Eliminating 0% APMC broker commissions by connecting farmers directly to supermarkets, hotel chains, and bulk buyers via escrow payments.

---

## 2. Complete File Directory & Component Inventory

All 102 project files are consolidated directly inside the **`PDD`** folder:

### 📄 Core Application HTML Pages (12 Modules + Preview)
- `preview.html` — Master Start-to-End App Flow Shell with Desktop/Tablet/Mobile responsive preview toggles.
- `index.html` — Authentication, Login, Registration, and SMS OTP Password Recovery.
- `welcome.html` — Animated Brand Splash & Platform Onboarding.
- `main_hub.html` — Central Command Hub connecting all 12 modules.
- `dashboard.html` — Planter AI (Banana Variety & Stage Management).
- `pest_watch_guidance.html` — Banana Armor AI (Pest Watch, Disease Scan, Nutrient Care).
- `climate_risk.html` — Sky Intel AI (Weather & 10-Year Climate Risk Intelligence).
- `renting.html` — Rentrox AI (Machinery & Farm Labor Rental).
- `analytics.html` — Yexa AI (Financial Yield, Expense & ROI Analytics).
- `market.html` — MarketX AI (APMC Live Mandi Rates & B2B Trading).
- `b2c_selling.html` — Direct B2C Farmgate Marketplace.
- `profile.html` — Master Farmer Profile & Cryptographic Digital Agri-Pass.
- `region.html` — Indian District Regional Suitability & Soil Mapping.

### 🎨 Stylesheets & Design System
- `style.css` — Global Glassmorphism UI, Golden Touch & Hover System (`#FFD700` radial glow), and Base Layout tokens.
- `market.css` — Mandi cards, trading charts, and B2B table styling.
- `renting.css` — Equipment grid, rental booking modals, manpower cards.
- `analytics.css` — KPI cards, financial graphs, cost breakdown meters.
- `climate_risk.css` — Cyberpunk/Glass weather widgets and radar indicators.
- `pest_watch_guidance.css` — 3D disease scanner, dosage calculator, and treatment guides.
- `ashwatthama.css` — Crop intelligence banners and assistant styling.

### ⚙️ Logic Scripts & Multilingual Engine
- `script.js` — Auth state, form toggling, OTP modal logic, global language switcher engine.
- `translations.js` — Master dictionary containing full translations for **12 Indian Languages**:
  *(English, Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Urdu, Kannada, Odia, Malayalam, Punjabi)*.
- `dashboard.js`, `dashboard_translations.js` — Stage progression & variety data.
- `pest_watch_guidance.js` — 3D disease diagnosis & spray dosage calculator.
- `climate_risk.js`, `climate_data.js` — Historical weather data & risk scoring engine.
- `renting.js` — Equipment booking, listing creation, and rate estimator.
- `analytics.js`, `analytics_translations.js` — Financial yield calculation algorithms.
- `market.js`, `market_translations.js` — APMC price updates & auction bidding simulator.
- `b2c_selling.js` — Direct farmgate batch publisher & escrow tracker.
- `profile.js` — Farmer profile manager & PDF Agri-Pass generator.
- `region.js`, `region_translations.js`, `indian_districts.js`, `indian_districts.json` — District geolocation & soil mapping database.
- `firebase-config.js` — Firebase Authentication & Firestore configuration.
- `server.ps1` — Resilient local HTTP server for offline/online faculty demonstration (Port 8085).

---

## 3. How to Present to Faculty

### Steps for Live Presentation:
1. Open the project folder `PDD`.
2. Launch **`preview.html`** in any browser (Chrome, Edge, Firefox).
3. Demonstrate switching between all 12 app modules using the top step tabs.
4. Show the **Golden Touch & Hover Effect** on the left sidebar menu options.
5. Demonstrate changing the language via the top-right **12-Language Selector** to show instant translations in Hindi, Tamil, Telugu, Marathi, Bengali, Kannada, Punjabi, etc.
6. Run `server.ps1` via PowerShell to demonstrate local HTTP server hosting on `http://127.0.0.1:8085/preview.html`.

---
© 2026 MICROSUN AI Management Project Submission.
