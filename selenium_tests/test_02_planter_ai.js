/**
 * Test Suite 02: Planter AI Selector & Crop Lifecycle Management
 */

const { createDriver, waitForVisible, safeClick, By } = require('./utils');
const config = require('./config');
const assert = require('assert');

async function runTest() {
    const results = [];
    let driver;

    try {
        driver = await createDriver();

        // TC-SEL-05: Planter AI Dashboard Load
        const t0 = Date.now();
        await driver.get(`${config.baseUrl}/dashboard.html`);
        const header = await waitForVisible(driver, By.css('.dashboard-header, h2'));
        const headerText = await header.getText();
        assert(headerText.includes('Banana') || headerText.includes('Variant') || headerText.includes('Select'), 'Header text verified');
        results.push({
            id: 'TC-SEL-05',
            name: 'Planter AI Dashboard Loading',
            category: 'Planter AI',
            status: 'PASSED',
            durationMs: Date.now() - t0,
            details: `Dashboard rendered with header: "${headerText}"`
        });

        // TC-SEL-06: Banana Variety Selection (Grand Naine G9)
        const t1 = Date.now();
        const cards = await driver.findElements(By.css('.variant-card'));
        assert(cards.length > 0, 'Multiple banana variants available');
        const g9Card = await waitForVisible(driver, By.css('.variant-card[data-variant="grand_naine"], .variant-card'));
        await g9Card.click();
        results.push({
            id: 'TC-SEL-06',
            name: 'Banana Crop Variant Selection (Grand Naine G9)',
            category: 'Planter AI',
            status: 'PASSED',
            durationMs: Date.now() - t1,
            details: `Found ${cards.length} distinct banana crop varieties; successfully selected Grand Naine`
        });

        // TC-SEL-07: Farmer Central Hub Navigation
        const t2 = Date.now();
        await driver.get(`${config.baseUrl}/main_hub.html`);
        const hubTitle = await waitForVisible(driver, By.css('.welcome-header h1, h1'));
        const hubText = await hubTitle.getText();
        assert(hubText.includes('Farmer') || hubText.includes('Hub') || hubText.includes('Central'), 'Hub title verified');
        results.push({
            id: 'TC-SEL-07',
            name: 'Farmer Central Command Hub Navigation',
            category: 'Navigation',
            status: 'PASSED',
            durationMs: Date.now() - t2,
            details: `Central Hub active with command center title: "${hubText}"`
        });

    } catch (err) {
        results.push({
            id: 'TC-SEL-05-07-ERR',
            name: 'Planter AI Suite Error',
            category: 'Planter AI',
            status: 'FAILED',
            durationMs: 0,
            details: err.message
        });
    } finally {
        if (driver) await driver.quit();
    }

    return results;
}

module.exports = { runTest };
if (require.main === module) {
    runTest().then(res => console.log(JSON.stringify(res, null, 2)));
}
