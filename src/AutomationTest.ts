import { spawn } from "child_process";
import path = require("path");

// Automation test: starts the real server and sends HTTP requests to check
// email and age validation. No database needed: invalid input is rejected
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

const automation_test = async () => {
    const server = spawn(process.execPath, [path.join(__dirname, "index.js")], {
        env: { ...process.env, PORT: String(PORT) },
        stdio: "ignore"
    });
    let failed = 0;

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

        // email
        await expectRejected("1 email without @", { name: "A", email: "not-an-email" });
        await expectRejected("2 email without domain dot", { name: "A", email: "a@b" });
        await expectRejected("3 email with space inside", { name: "A", email: "a b@c.co" });
        await expectRejected("4 email missing", { name: "A" });
        await expectRejected("5 email not a string", { name: "A", email: 123 });
        await expectRejected("6 email empty", { name: "A", email: "" });

        // age
        await expectRejected("7 age negative", { name: "A", email: "a@b.co", age: -1 });
        await expectRejected("8 age decimal", { name: "A", email: "a@b.co", age: 1.5 });
        await expectRejected("9 age string", { name: "A", email: "a@b.co", age: "20" });
        await expectRejected("10 age null", { name: "A", email: "a@b.co", age: null });

        // name
        await expectRejected("11 name missing", { email: "a@b.co" });
        await expectRejected("12 name blank", { name: "   ", email: "a@b.co" });
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
