/**
 * MICROSUN MANAGEMENT - Main Navigation Hub Page Object
 */

const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');
const WaitUtil = require('../utils/WaitUtil');

class HubPage extends BasePage {
    constructor(driver) {
        super(driver, 'main_hub.html');
        this.locators = {
            hubTitle: By.css('.welcome-header h1, h1'),
            sidebarMenu: By.id('mainSidebar'),
            menuToggle: By.id('menuToggle'),
            planterCard: By.css('a[href*="dashboard.html"], [onclick*="dashboard.html"]'),
            armorCard: By.css('a[href*="pest_watch_guidance.html"], [onclick*="pest_watch_guidance.html"]'),
            weatherCard: By.css('a[href*="climate_risk.html"], [onclick*="climate_risk.html"]'),
            rentingCard: By.css('a[href*="renting.html"], [onclick*="renting.html"]'),
            analyticsCard: By.css('a[href*="analytics.html"], [onclick*="analytics.html"]'),
            marketCard: By.css('a[href*="market.html"], [onclick*="market.html"]'),
            b2cCard: By.css('a[href*="b2c_selling.html"], [onclick*="b2c_selling.html"]'),
            profileCard: By.css('a[href*="profile.html"], [onclick*="profile.html"]'),
            regionCard: By.css('a[href*="region.html"], [onclick*="region.html"]')
        };
    }

    async toggleSidebar() {
        await WaitUtil.safeClick(this.driver, this.locators.menuToggle);
    }
}

module.exports = HubPage;
