/**
 * MICROSUN MANAGEMENT - Explicit Waits & Action Helpers
 */

const { until, By } = require('selenium-webdriver');
const config = require('../config/config');

class WaitUtil {
    static async waitForVisible(driver, locator, timeout = config.timeouts.elementWait) {
        const el = await driver.wait(until.elementLocated(locator), timeout);
        await driver.wait(until.elementIsVisible(el), timeout);
        return el;
    }

    static async waitForClickable(driver, locator, timeout = config.timeouts.elementWait) {
        const el = await this.waitForVisible(driver, locator, timeout);
        await driver.wait(until.elementIsEnabled(el), timeout);
        return el;
    }

    static async safeClick(driver, locator, timeout = config.timeouts.elementWait) {
        const el = await this.waitForClickable(driver, locator, timeout);
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", el);
        await driver.sleep(100);
        await el.click();
        return el;
    }

    static async safeType(driver, locator, text, timeout = config.timeouts.elementWait) {
        const el = await this.waitForVisible(driver, locator, timeout);
        await el.clear();
        await el.sendKeys(text);
        return el;
    }

    static async getElements(driver, locator) {
        try {
            return await driver.findElements(locator);
        } catch (e) {
            return [];
        }
    }
}

module.exports = WaitUtil;
