/**
 * MICROSUN MANAGEMENT - Banana Armor AI Page Object
 */

const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');
const WaitUtil = require('../utils/WaitUtil');

class ArmorPage extends BasePage {
    constructor(driver) {
        super(driver, 'pest_watch_guidance.html');
        this.locators = {
            mainTitle: By.css('h1, .armor-title'),
            scanTab: By.css('[data-view="disease-scan"], #tab-disease'),
            pestTab: By.css('[data-view="pest-watch"], #tab-pest'),
            nutrientTab: By.css('[data-view="nutrient-care"], #tab-nutrient'),
            uploadInput: By.css('input[type="file"], #leaf-upload')
        };
    }

    async switchTab(tabName) {
        if (tabName === 'disease-scan') await WaitUtil.safeClick(this.driver, this.locators.scanTab);
        if (tabName === 'pest-watch') await WaitUtil.safeClick(this.driver, this.locators.pestTab);
        if (tabName === 'nutrient-care') await WaitUtil.safeClick(this.driver, this.locators.nutrientTab);
    }
}

module.exports = ArmorPage;
