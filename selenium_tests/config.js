/**
 * MICROSUN MANAGEMENT - Selenium Testing Configuration
 */

module.exports = {
    baseUrl: process.env.BASE_URL || 'http://127.0.0.1:8085',
    timeout: 10000,
    browser: 'chrome',
    headless: true, // Set to false to watch browser execute visibly
    windowSize: { width: 1440, height: 900 }
};
