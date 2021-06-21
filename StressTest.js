
const puppeteer = require('puppeteer');
const change_mac = require('./helpers/change_mac.js')
const CLICK_INTERVAL = 10 * 1000 // 10s

class StressTest {

  constructor(server_host) {
    this.server_host = server_host
    this.portal_url = `http://${server_host}`
  }

  async start() {
    this.browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ['--window-size=1920,1080'],
      slowMo: 30,
    });
    this.page = await this.browser.newPage();
    this.page.setDefaultTimeout(1000 * 60 * 5);
    await this.loop()
  }

  async loadPortalPage() {
    await this.page.goto(this.portal_url, { waitUntil: 'networkidle0' });
  }

  async loop() {
    while(true) {
      await this.toggleSession()
      await new Promise(r => {
        setTimeout(r, CLICK_INTERVAL)
      })
    }
  }

  async sessionBtn () {
    return await this.page.$("#sessions-list-con .table .btn");
  }

  //async isRunning() {
  //  const button = await this.sessionBtn();
  //  const isRunning = await button.getProperty('className')
  //    .then(v => v.jsonValue())
  //    .then(classNames => classNames.split(' '))
  //    .then(classNames => classNames.includes('btn-warning'))
  //  return isRunning
  //}

  async toggleSession() {
    await change_mac()
    await this.loadPortalPage()
    await this.page.waitForSelector('#sessions-list-con')
    const button = await this.sessionBtn();
    await button.click()
  }

  async close() {
    await this.browser.close();
  }

}

module.exports = StressTest
