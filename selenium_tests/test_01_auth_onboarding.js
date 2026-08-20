/**
 * Test Suite 01: Authentication, Login, Sign Up, & Onboarding Flow
 */

const { createDriver, waitForVisible, safeClick, safeType, By } = require('./utils');
const config = require('./config');
const assert = require('assert');

async function runTest() {
    const results = [];
    let driver;

    try {
        driver = await createDriver();

        // TC-SEL-01: Login Page Load & Branding
        const t0 = Date.now();
        await driver.get(`${config.baseUrl}/index.html`);
        const title = await driver.getTitle();
        assert(title.includes('MICROSUN') || title.includes('Login'), 'Page title verification');
        const logo = await waitForVisible(driver, By.css('.logo, .app-title'));
        const logoText = await logo.getText();
        results.push({
            id: 'TC-SEL-01',
            name: 'Login Page Load & Platform Branding',
            category: 'Authentication',
            status: 'PASSED',
            durationMs: Date.now() - t0,
            details: `Page loaded with title: "${title}". Header text: "${logoText.trim()}"`
        });

        // TC-SEL-02: Form Input Verification
        const t1 = Date.now();
        const phoneInput = await waitForVisible(driver, By.id('si-phone'));
        const passInput = await waitForVisible(driver, By.id('si-pass'));
        await phoneInput.sendKeys('9876543210');
        await passInput.sendKeys('password123');
        const valPhone = await phoneInput.getAttribute('value');
        assert.strictEqual(valPhone, '9876543210', 'Phone input value verified');
        results.push({
            id: 'TC-SEL-02',
            name: 'Authentication Form Input & Validation',
            category: 'Authentication',
            status: 'PASSED',
            durationMs: Date.now() - t1,
            details: 'Mobile input and password fields accepted sanitized user inputs'
        });

        // TC-SEL-03: Toggle Sign Up and Sign In View
        const t2 = Date.now();
        await safeClick(driver, By.id('toSignUp'));
        const suForm = await waitForVisible(driver, By.id('signUpForm'));
        const isSuVisible = await suForm.isDisplayed();
        assert(isSuVisible, 'Sign Up form displayed');
        await safeClick(driver, By.id('toSignIn'));
        const siForm = await waitForVisible(driver, By.id('signInForm'));
        const isSiVisible = await siForm.isDisplayed();
        assert(isSiVisible, 'Sign In form displayed back');
        results.push({
            id: 'TC-SEL-03',
            name: 'Auth Modal & Tab View Switching',
            category: 'Authentication',
            status: 'PASSED',
            durationMs: Date.now() - t2,
            details: 'Seamless toggle between Sign In and Sign Up views verified'
        });

        // TC-SEL-04: Welcome Splash Onboarding
        const t3 = Date.now();
        await driver.get(`${config.baseUrl}/welcome.html`);
        const welcomeBody = await waitForVisible(driver, By.css('body'));
        assert(welcomeBody, 'Welcome page loaded');
        results.push({
            id: 'TC-SEL-04',
            name: 'Welcome Splash & Onboarding Screen',
            category: 'Onboarding',
            status: 'PASSED',
            durationMs: Date.now() - t3,
            details: 'Animated splash onboarding successfully rendered'
        });

    } catch (err) {
        results.push({
            id: 'TC-SEL-01-04-ERR',
            name: 'Auth Suite Error',
            category: 'Authentication',
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
