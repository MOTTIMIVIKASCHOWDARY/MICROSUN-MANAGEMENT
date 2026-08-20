# 🌿 MICROSUN MANAGEMENT - Smart Agricultural & Crop Management System

[![MICROSUN CI/CD Pipeline](https://github.com/MOTTIMIVIKASCHOWDARY/MICROSUN-MANAGEMENT/actions/workflows/deploy-and-test.yml/badge.svg)](https://github.com/MOTTIMIVIKASCHOWDARY/MICROSUN-MANAGEMENT/actions/workflows/deploy-and-test.yml)
[![DevSecOps & QA Audit](https://github.com/MOTTIMIVIKASCHOWDARY/MICROSUN-MANAGEMENT/actions/workflows/security-review.yml/badge.svg)](https://github.com/MOTTIMIVIKASCHOWDARY/MICROSUN-MANAGEMENT/actions/workflows/security-review.yml)
![License](https://img.shields.io/badge/License-MIT-brightgreen.svg)
![Version](https://img.shields.io/badge/Version-v1.0.0--Official-blue.svg)
![Build Status](https://img.shields.io/badge/Build-Passing-success.svg)

Welcome to **MICROSUN MANAGEMENT**, an advanced, full-stack agricultural management and crop analytics platform built for modern smart farming. The platform integrates AI-driven crop disease diagnostics, real-time climate risk modeling, peer-to-peer equipment rental, mandi market price analytics, and comprehensive multilingual support.

---

## 🚀 Key Features & Modules

### 🌾 1. Smart Crop Hub & Dashboard (`web_app/`)
* **Planter AI & Crop Life-Cycle Guidance**: Stage-by-stage growth tracking (Seedling, Vegetative, Flowering, Fruiting, Ratoon).
* **Banana Armor AI & Disease Diagnostics**: Computer-vision-powered leaf analysis with treatment recommendations for Panama Wilt, Black Sigatoka, Erwinia Corm Rot, and Burrowing Nematodes.
* **Climate Risk Engine (`climate_risk.html`)**: Real-time district-level weather risk indicators, heatwave warnings, rainfall forecasts, and irrigation advice.
* **RentRox Equipment Marketplace (`renting.html`)**: Peer-to-peer rental network for tractors, rotavators, sprayers, harvesters, and drones.
* **B2C Market & Mandi Price Analytics (`market.html`)**: Direct-to-consumer produce listing and live commodity price updates.
* **Multilingual Engine**: Native support for English, Hindi, Telugu, Tamil, Kannada, and Marathi.

---

## 🛠️ Repository Architecture

```text
MICROSUN-MANAGEMENT/
├── .github/
│   └── workflows/
│       ├── deploy-and-test.yml         # CI/CD Build, Web App Validation & E2E Pipeline
│       └── security-review.yml         # DevSecOps, SAST, SCA & Automated Security Audit
├── web_app/                            # Complete Web Application Source Code & Assets
│   ├── index.html                      # Authentication & Onboarding
│   ├── main_hub.html                   # Central Navigation & AI Modules Hub
│   ├── dashboard.html                  # Core Farmer Dashboard
│   ├── pest_watch_guidance.html        # Banana Armor AI Disease Diagnostics
│   ├── climate_risk.html               # Weather & Risk Modeling Engine
│   ├── renting.html                    # RentRox Equipment Rental Marketplace
│   ├── market.html                     # Mandi Prices & B2C Sales
│   └── profile.html                    # Farmer Profile & Settings
├── selenium_tests/                     # Automated Selenium E2E Test Suite (Node.js)
│   ├── run_all_selenium_tests.js       # Master E2E Test Runner
│   ├── test_01_auth_onboarding.js      # Auth & Onboarding Tests
│   ├── test_03_banana_armor_ai.js      # AI Disease Watch Suite
│   └── utils.js                        # Test Utilities & Drivers
├── automation/                         # Load Testing & Performance Benchmark Scripts
├── Test Results/                       # Automated Test Execution Reports & Screenshots
│   ├── Excel/                          # Excel Test Execution Workbooks
│   └── HTML/                           # Interactive HTML Test Dashboard
├── Vulnerability Test Results/          # DevSecOps Audit & Security Reports
│   ├── MICROSUN_SECURITY_AUDIT_MASTER.xlsx
│   └── security-review.md
├── MICROSUN_OFFICIAL_TEST_REPORT.xlsx  # Official Master Test Report
└── README.md                           # Project Documentation
```

---

## 💻 Local Setup & Execution

### 1. Running the Web Application
No external build tools are required. You can serve the static files using any local web server or PowerShell:

```powershell
# Option A: PowerShell Local Server
cd web_app
.\server.ps1

# Option B: Python HTTP Server
cd web_app
python -m http.server 8000
```
Open your browser and navigate to `http://localhost:8000`.

### 2. Running Automated Selenium Tests
```bash
# Navigate to test framework folder
cd selenium_tests

# Install dependencies
npm install

# Run complete End-to-End test suite
node run_all_selenium_tests.js
```

---

## 🛡️ CI/CD & GitHub Actions Automation

This repository includes **2 automated GitHub Actions workflows**:

1. **`MICROSUN Live GitHub Pages CI/CD & E2E Selenium Pipeline`**
   - Automatically builds, package-verifies, and validates all web application core components.
   - Executes static code quality checks and automated testing routines.

2. **`MICROSUN DevSecOps & QA Security Audit Pipeline`**
   - Runs automated SAST (Static Application Security Testing) and secret scanning.
   - Executes dependency vulnerability scans and generates automated evaluation summaries.

---

## 📊 Verification & Test Summary

| Metric | Result | Status |
|---|---|---|
| **E2E Test Pass Rate** | 100% | ✅ PASSED |
| **Total Test Scenarios** | 440+ Executed | ✅ PASSED |
| **Security Audit** | 0 Critical Vulnerabilities | ✅ VERIFIED |
| **Supported Browsers** | Chrome, Edge, Firefox, Headless | ✅ PASSED |
| **Supported Languages** | English, Hindi, Telugu, Tamil, Kannada, Marathi | ✅ PASSED |

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

**Maintained by:** [MOTTIMIVIKASCHOWDARY](https://github.com/MOTTIMIVIKASCHOWDARY)
