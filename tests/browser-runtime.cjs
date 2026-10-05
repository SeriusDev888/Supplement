// Optional locally installed Chrome; otherwise use Playwright's Chromium.
exports.launchOptions = process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {};
