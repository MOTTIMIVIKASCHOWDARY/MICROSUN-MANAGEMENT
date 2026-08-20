/**
 * MICROSUN MANAGEMENT - Selenium Test Utilities & Driver Helper
 */

const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const config = require('./config');

async function createDriver() {
    const options = new chrome.Options();
    if (config.headless) {
        options.addArguments('--headless=new');
    }
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-gpu');
    options.addArguments('--disable-extensions');
    options.addArguments('--disable-background-networking');
    options.addArguments(`--window-size=${config.windowSize.width},${config.windowSize.height}`);
    options.setPageLoadStrategy('eager');

    const driver = await new Builder()
        .forBrowser(config.browser)
        .setChromeOptions(options)
        .build();

    await driver.manage().setTimeouts({ implicit: 3000, pageLoad: 12000, script: 10000 });
    return driver;
}

async function waitForVisible(driver, locator, timeoutMs = 6000) {
    const el = await driver.wait(until.elementLocated(locator), timeoutMs);
    await driver.wait(until.elementIsVisible(el), timeoutMs);
    return el;
}

async function safeClick(driver, locator, timeoutMs = 6000) {
    const el = await waitForVisible(driver, locator, timeoutMs);
    await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", el);
    await driver.sleep(150);
    await el.click();
    return el;
}

async function safeType(driver, locator, text, timeoutMs = 6000) {
    const el = await waitForVisible(driver, locator, timeoutMs);
    await el.clear();
    await el.sendKeys(text);
    return el;
}

module.exports = {
    createDriver,
    waitForVisible,
    safeClick,
    safeType,
    By,
    until
};
