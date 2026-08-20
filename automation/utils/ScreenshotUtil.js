/**
 * MICROSUN MANAGEMENT - Automated Screenshot Capture Utility
 */

const fs = require('fs');
const path = require('path');
const config = require('../config/config');
const Logger = require('./Logger');

class ScreenshotUtil {
    static async capture(driver, testId, status = 'FAILURE') {
        try {
            if (!fs.existsSync(config.paths.screenshots)) {
                fs.mkdirSync(config.paths.screenshots, { recursive: true });
            }
            const sanitizedId = testId.replace(/[^a-zA-Z0-9_-]/g, '_');
            const filename = `${sanitizedId}_${status}_${Date.now()}.png`;
            const filepath = path.join(config.paths.screenshots, filename);

            const imageBase64 = await driver.takeScreenshot();
            fs.writeFileSync(filepath, imageBase64, 'base64');
            Logger.info(`Screenshot captured: ${filename}`);
            return filename;
        } catch (err) {
            Logger.warn(`Failed to capture screenshot for ${testId}: ${err.message}`);
            return null;
        }
    }
}

module.exports = ScreenshotUtil;
