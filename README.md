# 🌿 MICROSUN MANAGEMENT - Smart Agricultural & Crop Management System

[![MICROSUN CI/CD Pipeline](https://github.com/MOTTIMIVIKASCHOWDARY/MICROSUN-MANAGEMENT/actions/workflows/deploy-and-test.yml/badge.svg)](https://github.com/MOTTIMIVIKASCHOWDARY/MICROSUN-MANAGEMENT/actions/workflows/deploy-and-test.yml)
[![DevSecOps & QA Audit](https://github.com/MOTTIMIVIKASCHOWDARY/MICROSUN-MANAGEMENT/actions/workflows/security-review.yml/badge.svg)](https://github.com/MOTTIMIVIKASCHOWDARY/MICROSUN-MANAGEMENT/actions/workflows/security-review.yml)
![License](https://img.shields.io/badge/License-MIT-brightgreen.svg)
![Version](https://img.shields.io/badge/Version-v1.0.0--Official-blue.svg)
![Build Status](https://img.shields.io/badge/Build-Passing-success.svg)

Welcome to **MICROSUN MANAGEMENT**, an advanced, full-stack agricultural management and crop analytics platform built for modern smart farming. The platform integrates AI-driven crop disease diagnostics, real-time climate risk modeling, peer-to-peer equipment rental, mandi market price analytics, and comprehensive multilingual support.

## 📊 Faculty Evaluation & Separate Test Reports Index

For academic evaluation, all test case results and audit findings are organized into separate, dedicated files and spreadsheets:

### 📄 Separate Excel Workbooks & Spreadsheets
1. **Master Test Report**: [`MICROSUN_OFFICIAL_TEST_REPORT.xlsx`](./MICROSUN_OFFICIAL_TEST_REPORT.xlsx) — *6 Sheets containing 400+ Executed Test Cases*
2. **Passed Test Cases**: [`Test Results/Excel/Passed_Test_Cases.xlsx`](./Test%20Results/Excel/Passed_Test_Cases.xlsx) — *All passing test cases*
3. **Failed Test Cases**: [`Test Results/Excel/Failed_Test_Cases.xlsx`](./Test%20Results/Excel/Failed_Test_Cases.xlsx) — *Defect & remediation log (0 Failures)*
4. **Endpoint Inventory**: [`Vulnerability Test Results/endpoint-inventory.xlsx`](./Vulnerability%20Test%20Results/endpoint-inventory.xlsx) — *API Route Inventory*
5. **Security Findings**: [`Vulnerability Test Results/findings.xlsx`](./Vulnerability%20Test%20Results/findings.xlsx) — *OWASP Top 10 & CWE Findings*
6. **Structured Test Cases**: [`Vulnerability Test Results/test-cases.xlsx`](./Vulnerability%20Test%20Results/test-cases.xlsx) — *Detailed Test Case Definitions*
7. **Security Audit Master**: [`Vulnerability Test Results/MICROSUN_SECURITY_AUDIT_MASTER.xlsx`](./Vulnerability%20Test%20Results/MICROSUN_SECURITY_AUDIT_MASTER.xlsx) — *Security & QA Master Analysis*

### 📝 Separate Audit Reports & Technical Documents
1. **Executive Summary**: [`Vulnerability Test Results/executive-summary.md`](./Vulnerability%20Test%20Results/executive-summary.md) — *High-level Risk Rating & Score*
2. **Backend Discovery Inventory**: [`Vulnerability Test Results/backend-inventory.md`](./Vulnerability%20Test%20Results/backend-inventory.md) — *Architecture & Tech Stack Analysis*
3. **SAST/DAST Security Review**: [`Vulnerability Test Results/security-review.md`](./Vulnerability%20Test%20Results/security-review.md) — *OWASP Security Audit*
4. **Dependency & Secrets Report**: [`Vulnerability Test Results/dependency-report.md`](./Vulnerability%20Test%20Results/dependency-report.md) — *Gitleaks & Trivy Scan Results*
5. **Performance & 100 VU Load Report**: [`web_app/LOAD_TEST_REPORT.md`](./web_app/LOAD_TEST_REPORT.md) & [`Vulnerability Test Results/performance-report.md`](./Vulnerability%20Test%20Results/performance-report.md) — *RPS & Latency Metrics*
6. **Remediation Guide**: [`Vulnerability Test Results/remediation-guide.md`](./Vulnerability%20Test%20Results/remediation-guide.md) — *Patch & Fix Recommendations*

### 🌐 Interactive HTML & JSON Dashboards
1. **Interactive Test Dashboard**: [`Test Results/HTML/execution-report.html`](./Test%20Results/HTML/execution-report.html)
2. **JSON Execution Log**: [`Test Results/JSON/execution-results.json`](./Test%20Results/JSON/execution-results.json)

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
│   └── workflows/                      # CI/CD Workflows for Web, Security & Android
├── android_app/                        # Native Android Studio Mobile App (Kotlin / Jetpack Compose)
│   ├── app/                            # Android Source Code (Kotlin, Assets, Manifest)
│   ├── build.gradle.kts                # Gradle Build Configuration
│   └── Banana-web/                     # Embedded PWA Assets
├── appium_tests/                       # Appium Mobile Automation Test Suite
│   ├── tests/                          # Mobile E2E Test Scripts
│   ├── config/                         # Appium Drivers & Capability Configurations
│   └── runners/                        # Appium Suite Test Runners
├── web_app/                            # Full Web Application Source Code & Assets
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
