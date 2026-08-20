/**
 * MICROSUN MANAGEMENT - Master CI/CD & Selenium Automation Runner
 */

const { execSync } = require('child_process');
const path = require('path');
const DriverFactory = require('./utils/DriverFactory');
const Logger = require('./utils/Logger');
const { executeTestSuite } = require('./tests/masterTestSuite');
const ReportGenerator = require('./utils/ReportGenerator');
const config = require('./config/config');

async function main() {
    console.log('\n================================================================================');
    console.log('  🌿 MICROSUN MANAGEMENT - ENTERPRISE LIVE CI/CD & E2E AUTOMATION');
    console.log('================================================================================');
    console.log(`  Target Environment : ${config.baseUrl}`);
    console.log(`  Browser            : ${config.browser.toUpperCase()} (Headless: ${config.headless})`);
    console.log(`  Framework          : Page Object Model (POM) + Explicit Waits + Retries`);
    console.log('================================================================================\n');

    let driver;
    const startTime = Date.now();

    try {
        driver = await DriverFactory.createDriver();

        // 1. Verify Deployment Availability (Healthcheck)
        Logger.info(`Performing Deployment Availability Check on ${config.baseUrl}...`);
        await driver.get(config.baseUrl);
        const title = await driver.getTitle();
        Logger.pass(`Deployment Verified! Page Title: "${title}"`);

        // 2. Execute 440+ Test Cases
        const results = await executeTestSuite(driver);
        const durationSec = ((Date.now() - startTime) / 1000).toFixed(2);

        // 3. Generate HTML, JSON, and Markdown Reports
        Logger.info('Generating HTML, JSON, and Markdown artifacts...');
        ReportGenerator.generateReports(results, durationSec);

        // 4. Generate Excel Workbooks via PowerShell COM Engine
        Logger.info('Generating 4 Master Excel Workbooks...');
        try {
            const psScript = path.join(__dirname, 'utils', 'GenerateExcelReports.ps1');
            execSync(`powershell -ExecutionPolicy Bypass -File "${psScript}"`, { stdio: 'inherit' });
        } catch (e) {
            Logger.warn(`Notice on Excel generation: ${e.message}`);
        }

        // 5. Calculate Metrics
        const total = results.length;
        const passed = results.filter(r => r.status === 'PASSED').length;
        const failed = results.filter(r => r.status === 'FAILED').length;
        const passRate = ((passed / Math.max(1, total)) * 100).toFixed(2);

        console.log('\n================================================================================');
        console.log('  📊 LIVE GITHUB PAGES E2E AUTOMATION EXECUTION SUMMARY');
        console.log('================================================================================');
        console.log(`  • Target URL              : ${config.baseUrl}`);
        console.log(`  • Total Tests Executed    : ${total}`);
        console.log(`  • Passed Tests            : ${passed} (PASSED)`);
        console.log(`  • Failed Tests            : ${failed}`);
        console.log(`  • Overall Pass Percentage : ${passRate}%`);
        console.log(`  • Execution Duration      : ${durationSec}s`);
        console.log('================================================================================\n');

        // Pass/Fail Evaluation
        if (parseFloat(passRate) >= 95.0) {
            console.log('  🎯 CI/CD PIPELINE STATUS: [SUCCESS / PASSED (>= 95% THRESHOLD)]\n');
        } else {
            console.log('  ⚠️ CI/CD PIPELINE STATUS: [FAILURE / PASS RATE BELOW 95%]\n');
            process.exitCode = 1;
        }

    } catch (err) {
        Logger.error(`Critical Automation Failure: ${err.message}`);
        process.exitCode = 1;
    } finally {
        if (driver) {
            Logger.info('Tearing down WebDriver session...');
            await driver.quit();
        }
    }
}

if (require.main === module) {
    main();
}
