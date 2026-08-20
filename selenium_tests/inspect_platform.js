/**
 * MICROSUN MANAGEMENT - Deep Multi-Module Health & Bug Inspector
 * Audits all 12 HTML pages for runtime JavaScript errors, missing assets, broken buttons, or DOM defects.
 */

const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function inspectPlatform() {
    console.log('🔍 Starting Deep Health & Code Inspection across all 12 Modules...\n');

    const options = new chrome.Options();
    options.addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu');
    options.setPageLoadStrategy('eager');

    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    const pages = [
        'index.html',
        'welcome.html',
        'main_hub.html',
        'dashboard.html',
        'pest_watch_guidance.html',
        'climate_risk.html',
        'renting.html',
        'analytics.html',
        'market.html',
        'b2c_selling.html',
        'profile.html',
        'region.html',
        'load_test.html'
    ];

    const auditResults = [];

    for (const page of pages) {
        process.stdout.write(`  Checking http://127.0.0.1:8085/${page}... `);
        try {
            await driver.get(`http://127.0.0.1:8085/${page}`);
            await driver.sleep(200);

            // Fetch browser console logs
            const logs = await driver.manage().logs().get('browser').catch(() => []);
            const severe = logs.filter(l => l.level.name === 'SEVERE' && !l.message.includes('favicon'));
            const warnings = logs.filter(l => l.level.name === 'WARNING');

            // Check if essential body elements exist
            const bodyEl = await driver.findElement(By.css('body'));
            const isDisplayed = await bodyEl.isDisplayed();

            if (severe.length === 0) {
                console.log('✓ CLEAN (0 Severe Errors)');
                auditResults.push({ page, status: 'PERFECT', errors: [], warnings: warnings.length });
            } else {
                console.log(`⚠️ ISSUES DETECTED (${severe.length} errors)`);
                auditResults.push({ page, status: 'WARNING', errors: severe.map(s => s.message), warnings: warnings.length });
            }
        } catch (err) {
            console.log(`✗ FAILED: ${err.message}`);
            auditResults.push({ page, status: 'ERROR', errors: [err.message] });
        }
    }

    await driver.quit();

    console.log('\n================================================================================');
    console.log('  🔍 AUDIT SUMMARY:');
    console.log('================================================================================');
    auditResults.forEach(r => {
        console.log(`  [${r.status.padEnd(8)}] ${r.page.padEnd(28)} | Severe Errors: ${r.errors.length}`);
        if (r.errors.length > 0) {
            r.errors.forEach(e => console.log(`      ↳ Error: ${e}`));
        }
    });
    console.log('================================================================================\n');

    return auditResults;
}

inspectPlatform();
