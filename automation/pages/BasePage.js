/**
 * MICROSUN MANAGEMENT - Base Page Object Model
 */

const { By } = require('selenium-webdriver');
const config = require('../config/config');
const WaitUtil = require('../utils/WaitUtil');
const Logger = require('../utils/Logger');

class BasePage {
    constructor(driver, path = '') {
        this.driver = driver;
        this.path = path;
        this.url = `${config.baseUrl}/${this.path}`.replace(/\/+$/, '');
    }

    async navigate() {
        Logger.info(`Navigating to ${this.url}...`);
        await this.driver.get(this.url);
        await this.driver.sleep(200);
        return this;
    }

    async getTitle() {
        return await this.driver.getTitle();
    }

    async getCurrentUrl() {
        return await this.driver.getCurrentUrl();
    }

    async switchLanguage(langCode) {
        Logger.info(`Switching application language to: ${langCode}`);
        await this.driver.executeScript(`
            const sel = document.getElementById('lang-switch');
            if (sel) {
                sel.value = '${langCode}';
                sel.dispatchEvent(new Event('change'));
            }
        `);
        await this.driver.sleep(150);
    }

    async getConsoleErrors() {
        try {
            const logs = await this.driver.manage().logs().get('browser');
            return logs.filter(l => l.level.name === 'SEVERE' && !l.message.includes('favicon'));
        } catch (e) {
            return [];
        }
    }
}

module.exports = BasePage;
