/**
 * MICROSUN MANAGEMENT - Planter AI & Crop Selector Page Object
 */

const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');
const WaitUtil = require('../utils/WaitUtil');

class PlanterPage extends BasePage {
    constructor(driver) {
        super(driver, 'dashboard.html');
        this.locators = {
            headerTitle: By.css('.dashboard-header h1, h1'),
            cropCards: By.css('.crop-card, .variety-card, .variety-item'),
            searchBar: By.css('input[type="search"], #crop-search, input[placeholder*="Search"]'),
            grandNaineCard: By.css('[data-crop*="grand_naine"], .crop-card:first-child')
        };
    }

    async getCropCardCount() {
        const cards = await WaitUtil.getElements(this.driver, this.locators.cropCards);
        return cards.length;
    }
}

module.exports = PlanterPage;
