const puppeteer = require("puppeteer");

class BaseTest { 
  
    async startTest(domain, headlessStatus) {
      this.browser = await puppeteer.launch({
        headless: headlessStatus,
        defaultViewport: null,
        args: ["--window-size=1920,1080"],
        slowMo: 30,
      });
      let page = await this.browser.newPage();
      page.setDefaultTimeout(1000 * 60 * 5);
      await page.goto(domain, { waitUntil: "networkidle0" });
      return page;
    }

    async endTest() {
        await this.browser.close();
    }

}

module.exports = new BaseTest  