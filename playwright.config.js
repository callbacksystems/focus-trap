import { devices } from "@playwright/test"

export default {
  testDir: "./tests",
  testMatch: /.*_tests\.js/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000/",
    trace: "on-first-retry"
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    }
  ],

  webServer: {
    command: "npm start",
    reuseExistingServer: !process.env.CI
  }
}
