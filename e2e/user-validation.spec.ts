import { test, expect, Page } from "@playwright/test";

// ---------- API: email + age validation against the real server ----------

const invalidBodies: Array<[string, object]> = [
    ["email without @", { name: "A", email: "not-an-email" }],
    ["email without domain dot", { name: "A", email: "a@b" }],
    ["email with spaces inside", { name: "A", email: "a b@c.co" }],
    ["email missing", { name: "A" }],
    ["email not a string", { name: "A", email: 123 }],
    ["negative age", { name: "A", email: "a@b.co", age: -1 }],
    ["decimal age", { name: "A", email: "a@b.co", age: 1.5 }],
    ["string age", { name: "A", email: "a@b.co", age: "20" }],
    ["null age", { name: "A", email: "a@b.co", age: null }]
];

test.describe("API validation", () => {
    for (const [title, body] of invalidBodies) {
        test(`POST /users rejects ${title}`, async ({ request }) => {
            const res = await request.post("/users", { data: body });
            expect(res.status()).toBe(400);
            expect((await res.json()).message).toContain("valid email");
        });

        test(`PUT /users/:id rejects ${title}`, async ({ request }) => {
            const res = await request.put("/users/000000000000000000000000", { data: body });
            expect(res.status()).toBe(400);
        });
    }

    test("rejects malformed user id", async ({ request }) => {
        expect((await request.get("/users/not-an-id")).status()).toBe(400);
    });
});

// ---------- UI: the form in /app ----------

// Mock only the list call so the page loads without a database.
// POST requests fall through to the real server unless a test mocks them.
async function openApp(page: Page) {
    await page.route("**/users", (route) => {
        if (route.request().method() === "GET") {
            return route.fulfill({ json: [] });
        }
        return route.fallback();
    });
    await page.goto("/app/");
    await expect(page.locator("#empty")).toBeVisible();
}

async function fill(page: Page, name: string, email: string, age: string) {
    await page.locator("#name").fill(name);
    await page.locator("#email").fill(email);
    await page.locator("#age").fill(age);
}

test.describe("Frontend form", () => {
    test("browser blocks an email without @ (no request sent)", async ({ page }) => {
        await openApp(page);
        let posted = false;
        page.on("request", (r) => { posted ||= r.method() === "POST"; });

        await fill(page, "Somchai", "not-an-email", "20");
        await page.locator("#submit").click();

        await expect(page.locator("#email")).toHaveJSProperty("validity.valid", false);
        expect(posted).toBe(false);
    });

    test("browser blocks a negative age (no request sent)", async ({ page }) => {
        await openApp(page);
        let posted = false;
        page.on("request", (r) => { posted ||= r.method() === "POST"; });

        await fill(page, "Somchai", "s@example.com", "-5");
        await page.locator("#submit").click();

        await expect(page.locator("#age")).toHaveJSProperty("validity.valid", false);
        expect(posted).toBe(false);
    });

    test("browser blocks a decimal age (no request sent)", async ({ page }) => {
        await openApp(page);
        let posted = false;
        page.on("request", (r) => { posted ||= r.method() === "POST"; });

        await fill(page, "Somchai", "s@example.com", "1.5");
        await page.locator("#submit").click();

        await expect(page.locator("#age")).toHaveJSProperty("validity.valid", false);
        expect(posted).toBe(false);
    });

    test("server rejects 'a@b' (passes the browser check) and the error is shown", async ({ page }) => {
        await openApp(page);

        await fill(page, "Somchai", "a@b", "20");
        await page.locator("#submit").click();

        await expect(page.locator("#msg")).toHaveClass("error");
        await expect(page.locator("#msg")).toContainText("valid email");
    });

    test("valid input is sent as JSON with a numeric age", async ({ page }) => {
        await openApp(page);
        let sent: unknown;
        await page.route("**/users", (route) => {
            if (route.request().method() !== "POST") {
                return route.fallback();
            }
            sent = route.request().postDataJSON();
            return route.fulfill({ status: 201, json: { _id: "1", ...(sent as object) } });
        });

        await fill(page, "Somchai", "Somchai@Example.com", "20");
        await page.locator("#submit").click();

        await expect(page.locator("#msg")).toHaveText("User added.");
        expect(sent).toEqual({ name: "Somchai", email: "Somchai@Example.com", age: 20 });
    });

    test("age is optional and omitted from the body when empty", async ({ page }) => {
        await openApp(page);
        let sent: Record<string, unknown> = {};
        await page.route("**/users", (route) => {
            if (route.request().method() !== "POST") {
                return route.fallback();
            }
            sent = route.request().postDataJSON();
            return route.fulfill({ status: 201, json: { _id: "1", ...sent } });
        });

        await fill(page, "Jaidee", "j@x.io", "");
        await page.locator("#submit").click();

        await expect(page.locator("#msg")).toHaveText("User added.");
        expect(sent).not.toHaveProperty("age");
    });

    test("age 0 is accepted", async ({ page }) => {
        await openApp(page);
        let sent: Record<string, unknown> = {};
        await page.route("**/users", (route) => {
            if (route.request().method() !== "POST") {
                return route.fallback();
            }
            sent = route.request().postDataJSON();
            return route.fulfill({ status: 201, json: { _id: "1", ...sent } });
        });

        await fill(page, "Zero", "z@x.io", "0");
        await page.locator("#submit").click();

        await expect(page.locator("#msg")).toHaveText("User added.");
        expect(sent.age).toBe(0);
    });

    test("duplicate email error (409) is shown to the user", async ({ page }) => {
        await openApp(page);
        await page.route("**/users", (route) => {
            if (route.request().method() !== "POST") {
                return route.fallback();
            }
            return route.fulfill({ status: 409, json: { message: "Email already exists" } });
        });

        await fill(page, "Somchai", "dup@example.com", "20");
        await page.locator("#submit").click();

        await expect(page.locator("#msg")).toHaveClass("error");
        await expect(page.locator("#msg")).toHaveText("Email already exists");
    });
});
