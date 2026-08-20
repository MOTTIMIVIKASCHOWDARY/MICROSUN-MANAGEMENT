/**
 * MICROSUN MANAGEMENT - WebDriver Factory & Engine Provisioner
 */

const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const config = require('../config/config');
const Logger = require('./Logger');

class DriverFactory {
    static async createDriver() {
        Logger.info(`Initializing ${config.browser.toUpperCase()} WebDriver (Headless: ${config.headless})...`);
        
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

        await driver.manage().setTimeouts({
            implicit: config.timeouts.implicit,
            pageLoad: config.timeouts.pageLoad,
            script: config.timeouts.script
        });

        Logger.info('WebDriver initialized successfully.');
        return driver;
    }
}

module.exports = DriverFactory;
