/**
 * MICROSUN MANAGEMENT - Additional Module Page Objects
 */

const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');
const WaitUtil = require('../utils/WaitUtil');

class RentingPage extends BasePage {
    constructor(driver) {
        super(driver, 'renting.html');
        this.locators = {
            itemCards: By.css('.item-card, .equipment-card, .crew-card, div'),
            filterButtons: By.css('.filter-btn, button')
        };
    }
}

class AnalyticsPage extends BasePage {
    constructor(driver) {
        super(driver, 'analytics.html');
        this.locators = {
            sliders: By.css('input[type="range"], input[type="number"], select'),
            profitDisplay: By.css('.profit-display, .metric-value, #net-profit')
        };
    }
}

class MarketPage extends BasePage {
    constructor(driver) {
        super(driver, 'market.html');
        this.locators = {
            rateRows: By.css('.rate-row, .mandi-item, table tr'),
            stateSelect: By.id('state-select')
        };
    }
}

class B2CPage extends BasePage {
    constructor(driver) {
        super(driver, 'b2c_selling.html');
        this.locators = {
            orderCards: By.css('.order-card, .product-card, div')
        };
    }
}

class ProfilePage extends BasePage {
    constructor(driver) {
        super(driver, 'profile.html');
        this.locators = {
            farmerName: By.css('.farmer-name, h2, h3'),
            agriPassBadge: By.css('.agripass-badge, .badge, .status')
        };
    }
}

class RegionPage extends BasePage {
    constructor(driver) {
        super(driver, 'region.html');
        this.locators = {
            districtSelect: By.id('district-select'),
            soilGrid: By.css('.soil-grid, .zone-card')
        };
    }
}

class SkyIntelPage extends BasePage {
    constructor(driver) {
        super(driver, 'climate_risk.html');
        this.locators = {
            chartCanvas: By.css('canvas, #climateChart'),
            weatherAlert: By.css('.alert-card, .weather-banner')
        };
    }
}

module.exports = {
    RentingPage,
    AnalyticsPage,
    MarketPage,
    B2CPage,
    ProfilePage,
    RegionPage,
    SkyIntelPage
};
