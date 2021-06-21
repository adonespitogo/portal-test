const navMenu = require("../element_ids/navigation-elements");

class NavigationHelper {
  constructor(){
    this.element_id = navMenu;
  }
  async goto(page) {
    return {
      client: {
        portal: async () => {
          await page.waitForSelector(this.element_id.system);
          await page.click(this.element_id.system);
          await page.click(this.element_id.system_status);
          return page;
        },
      },
      admin: {
        devices: async () => {
          await page.waitForSelector(this.element_id.users);
          await page.click(this.element_id.users);
          await page.click(this.element_id.wifi_devices);
          return page;
        },
      },
    };
  }
}
module.exports = NavigationHelper;
