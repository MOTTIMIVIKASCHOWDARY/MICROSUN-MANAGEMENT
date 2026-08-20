/**
 * MICROSUN MANAGEMENT - Login & Auth Page Object
 */

const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');
const WaitUtil = require('../utils/WaitUtil');

class LoginPage extends BasePage {
    constructor(driver) {
        super(driver, 'index.html');
        this.locators = {
            brandTitle: By.css('h1, .brand-title, .login-header'),
            mobileInput: By.id('si-phone'),
            passwordInput: By.id('si-pass'),
            loginButton: By.id('btnSignIn'),
            errorMessage: By.id('si-error'),
            signupTab: By.id('tab-signup'),
            eyeToggle: By.css('.eye-toggle, .password-toggle')
        };
    }

    async enterCredentials(phone, password) {
        if (phone !== null) await WaitUtil.safeType(this.driver, this.locators.mobileInput, phone);
        if (password !== null) await WaitUtil.safeType(this.driver, this.locators.passwordInput, password);
        return this;
    }

    async clickLogin() {
        await WaitUtil.safeClick(this.driver, this.locators.loginButton);
        return this;
    }

    async getErrorMessage() {
        try {
            const el = await WaitUtil.waitForVisible(this.driver, this.locators.errorMessage, 2000);
            return await el.getText();
        } catch (e) {
            return '';
        }
    }
}

module.exports = LoginPage;
