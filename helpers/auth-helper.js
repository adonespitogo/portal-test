const login_id = require("../element_ids/login-page-elements");
const admin_credentials = require("../test_data/admin-credentials");

class AuthHelper {
  constructor({ server }) {
    if (server == "lite") {
      this.admin = admin_credentials.lite;
    } else {
      this.admin = admin_credentials.bussiness;
    }
  }

  async login(page) {
    await page.waitForSelector(login_id.username);
    await page.type(login_id.username, this.admin.username);
    await page.type(login_id.password, this.admin.password);
    await page.click(login_id.btn_login);
    return page;
  }
}
module.exports = AuthHelper;
