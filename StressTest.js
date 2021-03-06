
const puppeteer = require('puppeteer');
const get_mac_address = require('./helpers/get_mac_address.js')
const AddSession = require('./helpers/add_session.js')
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

  async addSession() {
    var add_session = new AddSession(this.page, this.server_host)
    await add_session.toMAC(await get_mac_address())
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
    return await this.page.$("#sessions-list-con .table .btn").catch(e => null);
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
    await this.loadPortalPage()
    await this.page.waitForSelector('#sessions-list-con')
    const button = await this.sessionBtn();
    if (!button) {
      await this.addSession()
      return this.toggleSession()
    }
    await button.click()
  }

  async close() {
    await this.browser.close();
  }

}

module.exports = StressTest
