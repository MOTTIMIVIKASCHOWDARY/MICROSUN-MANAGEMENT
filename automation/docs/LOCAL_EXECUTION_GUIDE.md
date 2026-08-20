# 💻 MICROSUN MANAGEMENT - Local Automation Execution Guide

> **How to execute the 440+ Selenium E2E Automation Framework locally or against staging/live URLs.**

---

## 1. Prerequisites
* **Node.js**: v18+ or v20+ installed (`node -v`)
* **Google Chrome**: Modern Chrome installed (`chrome.exe`)

---

## 2. Quick Start Execution

In PowerShell / Terminal:
```powershell
# 1. Navigate to the automation folder
cd c:\Users\unite\OneDrive\Desktop\PDD\automation

# 2. Install dependencies (First time only)
npm install

# 3. Run all 440+ Selenium E2E Tests (Headless Chrome)
node runner.js
```

---

## 3. Running Against a Custom Live Deployment URL

To test any live deployment or staging URL:
```powershell
# Set the BASE_URL environment variable and execute
$env:BASE_URL = "https://unite-dev.github.io/PDD/"
node runner.js
```

---

## 4. Generated Test Reports & Artifacts

After execution, all test reports are generated in **`PDD/Test Results/`**:
* 📊 **Excel**: `Test Results/Excel/Automation_Test_Report.xlsx` (6 Sheets)
* 🌐 **HTML**: `Test Results/HTML/execution-report.html` (Interactive Dashboard)
* 📝 **JSON**: `Test Results/JSON/execution-results.json`
* 📸 **Screenshots**: `Test Results/Screenshots/` (Captured on failures)
* 📜 **Logs**: `Test Results/Logs/automation.log`
