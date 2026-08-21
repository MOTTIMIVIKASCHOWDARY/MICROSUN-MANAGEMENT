/**
 * BasePage.js
 * Core Page Object Model class providing robust UI interaction wrappers,
 * explicit waits, touch gestures, and telemetry capture.
 */

class BasePage {
    constructor(driver) {
        this.driver = driver;
        this.timeout = 15000;
    }

    async findElement(locator) {
        return await this.driver.$(locator);
    }

    async click(locator) {
        const element = await this.findElement(locator);
        await element.waitForDisplayed({ timeout: this.timeout });
        await element.click();
    }

    async setValue(locator, value) {
        const element = await this.findElement(locator);
        await element.waitForDisplayed({ timeout: this.timeout });
        await element.setValue(value);
    }

    async getText(locator) {
        const element = await this.findElement(locator);
        await element.waitForDisplayed({ timeout: this.timeout });
        return await element.getText();
    }

    async isDisplayed(locator) {
        try {
            const element = await this.findElement(locator);
            return await element.isDisplayed();
        } catch {
            return false;
        }
    }

    async tapGesture(x, y) {
        await this.driver.touchAction([
            { action: 'press', x, y },
            { action: 'wait', ms: 100 },
            { action: 'release' }
        ]);
    }
}

module.exports = BasePage;
