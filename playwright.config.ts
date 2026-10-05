import { defineConfig } from "@playwright/test";

const port = 3100;

// Automation tests for the users API + frontend. No database is needed:
// invalid input is rejected before MongoDB is touched, and the UI tests
// mock the calls that would reach the database.
export default defineConfig({
    testDir: "./e2e",
    reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
    use: {
        baseURL: `http://localhost:${port}`
    },
    webServer: {
        command: "node dist/index.js",
        url: `http://localhost:${port}/`,
        env: { PORT: String(port) },
        reuseExistingServer: !process.env.CI
    }
});
