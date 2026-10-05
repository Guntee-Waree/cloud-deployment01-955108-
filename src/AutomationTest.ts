import { spawn } from "child_process";
import path = require("path");
import { Utils } from "./Utils";

// Automation test: (1) checks the email utils, (2) starts the real server and
// sends HTTP requests to check email and age validation. No database needed: invalid input is rejected
// with 400 before MongoDB is touched.
// Exit code 0 = all cases passed, 1 = at least one case failed.
const PORT = 3200;
const BASE = `http://localhost:${PORT}`;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const waitForServer = async (): Promise<void> => {
    for (let i = 0; i < 30; i++) {
        try {
            await fetch(`${BASE}/`);
            return;
        } catch {
            await sleep(500);
        }
    }
    throw new Error("server did not start");
};

const post = async (body: object): Promise<number> => {
    const res = await fetch(`${BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    return res.status;
};

// Utils checks run in-process: email must not be blank, email must not be a duplicate.
const util_checks = (): number => {
    const cases: Array<[string, boolean]> = [
        ["1 email empty is blank", Utils.isBlank("   ") === true],
        ["2 duplicate email found (ignores case)", Utils.isDuplicateEmail(" SomChai@Example.COM ", ["somchai@example.com"]) === true]
    ];
    let bad = 0;
    for (const [name, ok] of cases) {
        if (ok) {
            console.log(`Automation case ${name} passed`);
        } else {
            console.log(`Automation case ${name} failed`);
            bad++;
        }
    }
    return bad;
};

const automation_test = async () => {
    const server = spawn(process.execPath, [path.join(__dirname, "index.js")], {
        env: { ...process.env, PORT: String(PORT) },
        stdio: "ignore"
    });
    let failed = util_checks();

    const expectRejected = async (name: string, body: object) => {
        const status = await post(body);
        if (status === 400) {
            console.log(`Automation case ${name} passed`);
        } else {
            console.log(`Automation case ${name} failed: expected 400 but got ${status}`);
            failed++;
        }
    };

    try {
        await waitForServer();

        await expectRejected("3 invalid email", { name: "A", email: "not-an-email" });
        await expectRejected("4 negative age", { name: "A", email: "a@b.co", age: -1 });
    } catch (error) {
        console.log(`Automation test error: ${error}`);
        failed++;
    } finally {
        server.kill();
    }

    if (failed > 0) {
        process.exit(1);
    }
};

automation_test();
