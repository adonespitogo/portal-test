
class Admin {

  constructor(page, server_host) {
    this.page = page
    this.server_host = server_host
    this.admin_url = `http://${server_host}/admin`
    this.admin_creds = {username: 'admin', password: 'admin'}
  }

  async toMAC(mac_address) {
    this.mac_address = mac_address
    await this.openAdmin()
    await this.gotoWifiUser()
    await this.generateSession()
  }

  async openAdmin() {
    await this.page.goto(this.admin_url, { waitUntil: 'networkidle0' })
    if (await this.loginForm()) {
      await this.login()
    }
  }

  async loginForm() {
    return this.page.$('#login-form').catch(e => null)
  }

  async login() {
    await this.page.type('#username', this.admin_creds.username)
    await this.page.type('#password', this.admin_creds.password)
    await this.page.click('#login-button')
    await this.page.waitForNavigation({ waitUntil: 'networkidle0' })
  }

  async gotoWifiUser() {
    const sideNav = await this.page.$('#sidenav-menu-items')
    const [ users_link ] = await sideNav.$x("//a[contains(., 'Users')]");
    await users_link.click();
    const [ wifi_devices_link ] = await sideNav.$x("//a[contains(., 'WiFi Devices')]");
    await wifi_devices_link.click()
    await this.page.waitForSelector('#search-wifi-device')
    await this.page.evaluate((text) => {
      var e = document.getElementById('search-wifi-device');
      e.value = text;
      var $e = angular.element(e);
      $e.triggerHandler('input');
    }, this.mac_address)
    await new Promise(resolve => setTimeout(resolve, 2000))
    const device_link = await this.page.$('.wifi-users .table tbody tr .btn-info')
    await device_link.click()
    await this.page.waitForXPath(`//*[contains(., 'Manage Device')]`)
  }

  async generateSession() {
    const container = await this.page.$('#wrap')
    const [ sessions_link ] = await container.$x("//a[contains(., 'Available Sessions')]");
    await sessions_link.click()
    const add_session_btn = await container.$('#add-session');
    await add_session_btn.click()
    await this.page.waitForSelector('.modal .modal-header')
    await this.page.type('.edit-customer-modal #day', '30')
    const allow_pause_box = await this.page.$('#allow_pause')
    await allow_pause_box.click()
    await this.page.keyboard.press('Enter');
  }

}

module.exports = Admin
