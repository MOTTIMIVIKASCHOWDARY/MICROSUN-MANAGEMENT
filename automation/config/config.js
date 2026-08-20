/**
 * MICROSUN MANAGEMENT - Global Test Automation Configuration
 * Mandatory: Uses BASE_URL environment variable for live GitHub Pages deployment testing.
 */

const path = require('path');

// Target Live Deployment URL - Never hardcoded, dynamic via BASE_URL environment variable
const BASE_URL = process.env.BASE_URL || (process.env.CI ? 'https://unite-dev.github.io/PDD/' : 'http://127.0.0.1:8085');

module.exports = {
    baseUrl: BASE_URL.replace(/\/+$/, ''), // strip trailing slash
    browser: process.env.BROWSER || 'chrome',
    headless: process.env.HEADLESS !== 'false', // default to headless
    windowSize: {
        width: 1920,
        height: 1080
    },
    timeouts: {
        implicit: 3000,
        pageLoad: 20000,
        script: 15000,
        elementWait: 8000
    },
    retries: 2,
    screenshotOnFailure: true,
    paths: {
        screenshots: path.join(__dirname, '..', '..', 'Test Results', 'Screenshots'),
        logs: path.join(__dirname, '..', '..', 'Test Results', 'Logs'),
        reports: path.join(__dirname, '..', '..', 'Test Results', 'HTML'),
        excel: path.join(__dirname, '..', '..', 'Test Results', 'Excel'),
        json: path.join(__dirname, '..', '..', 'Test Results', 'JSON'),
        summary: path.join(__dirname, '..', '..', 'Test Results', 'Summary')
    }
};
