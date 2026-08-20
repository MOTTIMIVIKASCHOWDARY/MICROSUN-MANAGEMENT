const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function testDriver() {
    console.log('Testing Selenium WebDriver initialization with Chrome Headless...');
    let options = new chrome.Options();
    options.addArguments('--headless=new');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-gpu');

    let driver;
    try {
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        console.log('Driver created successfully!');
        await driver.get('http://127.0.0.1:8085/index.html');
        let title = await driver.getTitle();
        console.log('Page Title:', title);
        let appHeader = await driver.findElement(By.css('h1, .app-title, .logo, body'));
        let text = await appHeader.getText();
        console.log('Element Text Sample:', text.substring(0, 100));
        console.log('SUCCESS: Selenium WebDriver is working perfectly!');
    } catch (err) {
        console.error('Error during Selenium driver test:', err);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

testDriver();
