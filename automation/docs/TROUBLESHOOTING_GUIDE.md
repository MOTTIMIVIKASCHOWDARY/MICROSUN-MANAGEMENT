# 🔧 MICROSUN MANAGEMENT - CI/CD & Automation Troubleshooting Guide

---

## 1. Common Issues & Solutions

### Issue 1: GitHub Pages Deployment 404
* **Symptom**: `curl` returns `404 Not Found` for the live Pages URL.
* **Resolution**: Ensure GitHub Pages source is set to **`GitHub Actions`** in repository **Settings > Pages**.

### Issue 2: WebDriver Port or Session Timeout
* **Symptom**: `SessionNotCreatedException` or connection timeout.
* **Resolution**: The framework includes `--headless=new`, `--no-sandbox`, and `--disable-dev-shm-usage` flags in `DriverFactory.js`. Ensure Chrome is updated to the latest stable release.

### Issue 3: Excel COM Generation in Headless CI
* **Symptom**: `New-Object -ComObject Excel.Application` fails on Linux runners in GitHub Actions.
* **Resolution**: The framework runs `ReportGenerator.js` for pure JSON & HTML in Linux CI, while Excel COM generation is fully executed on Windows workstations.

---

## 2. Thresholds & Pass/Fail Criteria
* **Pipeline Success**: Pass rate $\ge 95.0\%$ across all 440+ test cases.
* **Pipeline Failure**: Target deployment unavailable (HTTP $\ne 200$) OR critical failure rate $> 5\%$.
