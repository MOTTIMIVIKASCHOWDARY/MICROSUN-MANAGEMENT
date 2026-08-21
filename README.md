# 🌿 MICROSUN MANAGEMENT - Smart Banana Crop Agricultural AI System

> **Agri-Tech Enterprise Platform & End-to-End Banana Crop Management System**

---

## 📋 Executive Overview

**MICROSUN MANAGEMENT** is a comprehensive, AI-driven precision agriculture platform built specifically for banana crop cultivation, disease prevention, farm equipment rental, yield analytics, APMC mandi trading, and direct B2C farmgate commerce.

The system features a **12-Module Ecosystem**, **Golden Touch & Hover UI**, and native **12 Indian Language Translation Engine**.

---

## 🚀 Quick Start Instructions (For Faculty & Evaluators)

### Option 1: Instant Browser Launch
1. Open the folder: `c:\Users\unite\OneDrive\Desktop\PROJECTS\PDD\`
2. Double-click **`index.html`** or **`preview.html`** to launch the MICROSUN Web Application directly in full-screen.

### Option 2: Live Local HTTP Server
1. Open PowerShell in the `PDD` folder.
2. Run:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\server.ps1
   ```
3. Open your browser and navigate to: **[http://127.0.0.1:8085/index.html](http://127.0.0.1:8085/index.html)**

### Option 3: Baseline / Load Testing (Faculty Evaluation Criteria)
1. Ensure the server is running on port 8085 (`powershell -File .\server.ps1`).
2. Run the automated 100-user 1-minute load test:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\run_load_test.ps1
   ```
3. Or open the interactive Load Test Console directly in the browser: **[http://127.0.0.1:8085/load_test.html](http://127.0.0.1:8085/load_test.html)**

---

## 🗂️ Project Structure & Module Breakdown

| Module # | Feature Name | Core HTML File | Main Functionality |
|---|---|---|---|
| **1** | **Login & Authentication** | [`index.html`](file:///c:/Users/unite/OneDrive/Desktop/PDD/web_app/index.html) | User authentication, Firebase integration, 2FA recovery, registration |
| **2** | **Splash & Onboarding** | [`welcome.html`](file:///c:/Users/unite/OneDrive/Desktop/PDD/web_app/welcome.html) | Brand introduction, platform highlights, animated entry |
| **3** | **Main Control Hub** | [`main_hub.html`](file:///c:/Users/unite/OneDrive/Desktop/PDD/web_app/main_hub.html) | Central command dashboard connecting all 12 modules |
| **4** | **Planter AI** | [`dashboard.html`](file:///c:/Users/unite/OneDrive/Desktop/PDD/web_app/dashboard.html) | Crop stage management, banana variety selector (Grand Naine, Nendran, Poovan, Rasthali, Yelakki, Red Banana) |
| **5** | **Banana Armor AI** | [`pest_watch_guidance.html`](file:///c:/Users/unite/OneDrive/Desktop/PDD/web_app/pest_watch_guidance.html) | Pest watch, 3D disease scan (Panama Wilt, Black Sigatoka, Bunchy Top, Anthracnose), nutrient care |
| **6** | **Sky Intel AI** | [`climate_risk.html`](file:///c:/Users/unite/OneDrive/Desktop/PDD/web_app/climate_risk.html) | 10-year climate risk analysis, rainfall predictions, district weather advisory |
| **7** | **Rentrox AI** | [`renting.html`](file:///c:/Users/unite/OneDrive/Desktop/PDD/web_app/renting.html) | Machinery & equipment rental marketplace, farm labor crew booking |
| **8** | **Yexa AI** | [`analytics.html`](file:///c:/Users/unite/OneDrive/Desktop/PDD/web_app/analytics.html) | Yield calculations, cost-benefit analysis, financial tracking, ROI reporting |
| **9** | **MarketX AI** | [`market.html`](file:///c:/Users/unite/OneDrive/Desktop/PDD/web_app/market.html) | APMC Live Mandi price discovery, B2B wholesale auctions across Indian states |
| **10** | **B2C Produce Selling** | [`b2c_selling.html`](file:///c:/Users/unite/OneDrive/Desktop/PDD/web_app/b2c_selling.html) | Direct farmgate marketplace for supermarkets & hotel chains (0% APMC broker fee) |
| **11** | **User Profile** | [`profile.html`](file:///c:/Users/unite/OneDrive/Desktop/PDD/web_app/profile.html) | Master farmer profile, digital Agri-Pass certificate, land records, escrow verification |
| **12** | **Region Advisory** | [`region.html`](file:///c:/Users/unite/OneDrive/Desktop/PDD/web_app/region.html) | District-level crop suitability analysis, soil type mapping across India |
| **13** | **Load Test Console** | [`load_test.html`](file:///c:/Users/unite/OneDrive/Desktop/PDD/web_app/load_test.html) | Real-time 100 VU / 1-min latency, RPS & performance benchmarking console |
| **Shell** | **Flow Preview** | [`preview.html`](file:///c:/Users/unite/OneDrive/Desktop/PDD/web_app/preview.html) | Multi-device interactive flow preview shell |

---

## 🌐 12 Indian Language Multilingual Engine

Supported languages via `<select id="lang-switch">`:
1. 🇬🇧 **English** (`en`)
2. 🇮🇳 **हिन्दी (Hindi)** (`hi`)
3. 🇮🇳 **বাংলা (Bengali)** (`bn`)
4. 🇮🇳 **मराठी (Marathi)** (`mr`)
5. 🇮🇳 **తెలుగు (Telugu)** (`te`)
6. 🇮🇳 **தமிழ் (Tamil)** (`ta`)
7. 🇮🇳 **ગુજરાતી (Gujarati)** (`gu`)
8. 🇮🇳 **اردو (Urdu)** (`ur`)
9. 🇮🇳 **ಕನ್ನಡ (Kannada)** (`kn`)
10. 🇮🇳 **ଓଡ଼ିଆ (Odia)** (`or`)
11. 🇮🇳 **മലയാളം (Malayalam)** (`ml`)
12. 🇮🇳 **ਪੰਜਾਬੀ (Punjabi)** (`pa`)

---

## 🎨 Design System Highlights

* **Golden Touch & Glow UI**: Interactive golden feedback (`#FFD700` radial glow, gold border, and gold text glow) on all sidebar menu touch and hover actions.
* **Modern Glassmorphism**: Glass-morphism containers, dark mode aesthetic, vibrant cards, responsive CSS flexbox/grid layouts.
* **Micro-Animations**: Smooth transitions, card hover transforms, 3D emoji icons.

---

## 👨‍💻 System Architecture & Stack

* **Frontend**: HTML5, Vanilla CSS3, JavaScript (ES6+)
* **Database & Auth**: Firebase Auth & Firestore (`firebase-config.js`)
* **Local Web Server**: PowerShell System.Net.HttpListener server (`server.ps1`)
* **Assets**: High-resolution 3D PNG assets, vector icons, custom crop images

---
© 2026 MICROSUN AI Management. All Rights Reserved.
