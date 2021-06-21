const BaseTest = require("./BaseTest");
const AuthHelper = require("../helpers/auth-helper");
const NavHelper = require("../helpers/navigation-helper");
const NotificationHelper = require("../helpers/notification-helper");
const { wifi_devices_id } = require("../element_ids/users-page-elements");
const { wifi_devices_test_data } = require("../test_data/users-test-data");

describe("STRESS TESTING", () => {
  let page;
  var authHelper = new AuthHelper({ server: "business" });
  var navHelper = new NavHelper({ server: "business" });

  beforeEach(async () => {
    try {
      page = await BaseTest.startTest(PORTAL_URL, false);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, TIMEOUT);

  it(
    "check available session, add session if none",
    async () => {
      const session = await page.$(".table > tbody > tr");
      console.log(session);
      if (session == null) {
        page = await BaseTest.endTest();
        page = await BaseTest.startTest(ADMIN_URL, false);
        page = await authHelper.login(page);
        page = await (await navHelper.goto(page)).admin.devices();
        await page.waitForSelector(wifi_devices_id.btn_manage_device_123);
        await page.click(wifi_devices_id.btn_manage_device_123);
        await page.waitForSelector(wifi_devices_id.btn_add_session);
        await page.click(wifi_devices_id.btn_add_session);
        await page.waitForSelector(wifi_devices_id.hour);
        await page.click(wifi_devices_id.hour, { clickCount: 3 });
        await page.type(wifi_devices_id.hour, wifi_devices_test_data.hour);
        await page.click(wifi_devices_id.btn_save_session);
        await (await NotificationHelper.users(page)).createdNotif();
        expect(await page.$(wifi_devices_id.session_status_0)).not.toBe(null);
      }
    },
    TIMEOUT
  );

  it(
    "play/pause session",
    async () => {
      const session = await page.$(".table > tbody > tr");
      let time = 0;
      while (session) {
         const button = await page.$('.table > tbody > tr > td > button');
         const credit = await page.$eval('.table > tbody > tr > td:first-child')
         console.log(credit)
         if(button !=null)
          await button.click()
          await page.waitForTimeout(5000);
          time += 5000;
      }

      expect(time).toBe(60000)
    },
    TIMEOUT
  );

  afterEach(async () => {
    await BaseTest.endTest();
  });
});
