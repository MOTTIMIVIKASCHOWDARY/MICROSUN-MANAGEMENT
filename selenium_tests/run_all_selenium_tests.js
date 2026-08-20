/**
 * MICROSUN MANAGEMENT - Master Selenium Test Runner
 * Executes all 10 End-to-End Test Suites, aggregates metrics, and generates reports.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const suites = [
    { name: '01. Authentication & Onboarding', file: './test_01_auth_onboarding' },
    { name: '02. Planter AI Crop Selector', file: './test_02_planter_ai' },
    { name: '03. Banana Armor AI (Pest/Disease/Nutrient)', file: './test_03_banana_armor_ai' },
    { name: '04. Sky Intel AI Climate Risk', file: './test_04_sky_intel_ai' },
    { name: '05. Rentrox AI Equipment & Labor', file: './test_05_rentrox_ai' },
    { name: '06. Yexa AI Financial Yield Calculator', file: './test_06_yexa_ai' },
    { name: '07. MarketX AI & B2C Selling', file: './test_07_market_and_b2c' },
    { name: '08. Farmer Profile & Regional Advisory', file: './test_08_profile_and_region' },
    { name: '09. 12-Language Native Multilingual Engine', file: './test_09_multilingual_engine' },
    { name: '10. Master Full End-to-End User Journey', file: './test_10_master_e2e_journey' }
];

async function main() {
    console.log('\n================================================================================');
    console.log('  🌿 MICROSUN MANAGEMENT - SELENIUM END-TO-END AUTOMATED TEST SUITE');
    console.log('================================================================================');
    console.log(`  Target Environment : http://127.0.0.1:8085`);
    console.log(`  Engine             : Selenium WebDriver (Chrome Headless)`);
    console.log(`  Total Suites       : ${suites.length} Suites`);
    console.log('================================================================================\n');

    const allResults = [];
    const startTime = Date.now();

    for (let i = 0; i < suites.length; i++) {
        const s = suites[i];
        process.stdout.write(`  [${i + 1}/${suites.length}] Running ${s.name}... `);
        try {
            const suiteMod = require(s.file);
            const suiteResults = await suiteMod.runTest();
            allResults.push(...suiteResults);
            const passed = suiteResults.filter(r => r.status === 'PASSED').length;
            const total = suiteResults.length;
            console.log(`✓ DONE (${passed}/${total} Passed)`);
        } catch (err) {
            console.log(`✗ FAILED (${err.message})`);
            allResults.push({
                id: `SUITE-${i + 1}-FAIL`,
                name: s.name,
                category: 'Suite Runner',
                status: 'FAILED',
                durationMs: 0,
                details: err.message
            });
        }
    }

    const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);
    const passedCount = allResults.filter(r => r.status === 'PASSED').length;
    const failedCount = allResults.filter(r => r.status === 'FAILED').length;
    const passRate = ((passedCount / Math.max(1, allResults.length)) * 100).toFixed(2);

    console.log('\n================================================================================');
    console.log('  📊 SELENIUM END-TO-END EXECUTION SUMMARY');
    console.log('================================================================================');
    console.log(`  • Total Test Cases Executed : ${allResults.length}`);
    console.log(`  • Passed Test Cases         : ${passedCount} (PASSED)`);
    console.log(`  • Failed Test Cases         : ${failedCount}`);
    console.log(`  • Overall Pass Rate         : ${passRate}%`);
    console.log(`  • Total Execution Duration  : ${totalDuration}s`);
    console.log('================================================================================\n');

    // Print Detailed Breakdown
    console.log('  TEST CASE DETAILS:');
    allResults.forEach(r => {
        const badge = r.status === 'PASSED' ? '[PASS]' : '[FAIL]';
        console.log(`  ${badge} ${r.id.padEnd(12)} | ${r.category.padEnd(16)} | ${r.name.padEnd(45)} | ${r.durationMs}ms`);
    });
    console.log('\n================================================================================\n');

    // Save JSON Results
    const jsonOutput = {
        platform: 'MICROSUN MANAGEMENT',
        testType: 'Selenium Automated End-to-End (E2E) Testing',
        timestamp: new Date().toISOString(),
        totalTests: allResults.length,
        passed: passedCount,
        failed: failedCount,
        passRate: `${passRate}%`,
        durationSeconds: parseFloat(totalDuration),
        tests: allResults
    };

    const jsonPath = path.join(__dirname, 'selenium_test_results.json');
    fs.writeFileSync(jsonPath, JSON.stringify(jsonOutput, null, 2), 'utf-8');
    console.log(`  JSON Test Results Saved : ${jsonPath}`);

    // Update Master Excel Workbook
    try {
        console.log('  Updating Master Excel Workbook with Selenium E2E Tab...');
        const psScript = path.join(__dirname, 'update_excel_selenium_tab.ps1');
        execSync(`powershell -ExecutionPolicy Bypass -File "${psScript}"`, { stdio: 'inherit' });
    } catch (e) {
        console.log(`  Notice on Excel update: ${e.message}`);
    }

    console.log('================================================================================\n');
}

main();
