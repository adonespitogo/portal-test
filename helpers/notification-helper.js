const notif_id = require('../element_ids/notification-elements');
const notif_label = require('../test_data/notification-test-data');

class NotificationHelper {
	async generic(page) {
		return {
			savedNotif: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.saved_toast_msg}')`
				);
			},
		};
	}

	async network(page) {
		return {
			restartNotif: async () => {
				const restart_notif = await page.$eval(
					notif_id.restart_notif,
					(label) => label.innerText
				);

				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.saved_toast_msg}')`
				);
				expect(restart_notif).toBe(notif_label.restart_notif);

				await page.waitForSelector(notif_id.link_restart);
			},
			sessionsNotif: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.saved_toast_msg}')`
				);
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.sessions_updated_toast_msg}')`
				);
			},
			globalSessionsNotif: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.saved_toast_msg}')`
				);
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.sessions_updated_toast_msg}')`
				);
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.global_sessions_updated_toast_msg}')`
				);

				const restart_notif = await page.$eval(
					notif_id.restart_notif,
					(label) => label.innerText
				);
				expect(restart_notif).toBe(notif_label.restart_notif);
			},
			savedNotif: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.saved_toast_msg}')`
				);
			},
			invalidNetAddressNotif: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.saved_toast_msg}')`
				);
			},
		};
	}

	async system(page) {
		return {
			activatedNotif: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.activated_toast_msg}')`
				);
			},
			invalidLicenseNotif: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.invalid_license_toast_msg}')`
				);
			},
			incorrectEmailPwdNotif: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.invalid_email_pwd_toast_msg}')`
				);
			},
		};
	}

	async sales(page) {
		return {
			savedNotif: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.saved_toast_msg}')`
				);
			},
			deleteNotif: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.config_successfully_deleted}')`
				);
			},
		};
	}
	async security(page) {
		return {
			restoredNotif: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.backup_restored_successfully}')`
				);
			},
		};
	}
	async users(page) {
		return {
			deviceAddedNotif: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.device_added_successfully}')`
				);
			},
			createdNotif: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.created}')`
				);
			},
			removedNotif: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.session_removed_succefully}')`
				);
			},
			blockedNotif: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.device_successfully_blocked}')`
				);
			},
			
		};
	}
	async account(page) {
		return {
			updatedNotif: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.account_updated_successfully}')`
				);
			},
			accountCreatedNotif: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.account_successfully_created}')`
				);
			},
			accountUpdatedNotif: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.account_updated_successfully}')`
				);
			},
			accountRemovedNotif: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.account_removed_successfully}')`
				);
			},


		};
	}
	async theme(page) {
		return {
			file_saved_successfully: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.file_saved_successfully}')`
				);
			},
			saved: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.saved}')`
				);
			},
			removed_file_successfully: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.removed_file_successfully}')`
				);
			},
			file_removed_successfully: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.file_removed_successfully}')`
				);
			},
			saved_successfully: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.saved_successfully}')`
				);
			},
			updated_successfully: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.updated_successfully}')`
				);
			},
			copied_successfully: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.copied_successfully}')`
				);
			},
			variant_switched_successfully: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.variant_switched_successfully}')`
				);
			},
			removed_successfully: async () => {
				await page.waitForFunction(
					`document.querySelector("body").innerText.includes('${notif_label.removed_successfully}')`
				);
			},
		};
	}
}
module.exports = new NotificationHelper();
