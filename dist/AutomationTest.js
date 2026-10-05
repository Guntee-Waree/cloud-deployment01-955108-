"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path = require("path");
// Automation test: starts the real server and sends HTTP requests to check
// email and age validation. No database needed: invalid input is rejected
// with 400 before MongoDB is touched.
// Exit code 0 = all cases passed, 1 = at least one case failed.
const PORT = 3200;
const BASE = `http://localhost:${PORT}`;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const waitForServer = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 30; i++) {
        try {
            yield fetch(`${BASE}/`);
            return;
        }
        catch (_a) {
            yield sleep(500);
        }
    }
    throw new Error("server did not start");
});
const post = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    return res.status;
});
const automation_test = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = (0, child_process_1.spawn)(process.execPath, [path.join(__dirname, "index.js")], {
        env: Object.assign(Object.assign({}, process.env), { PORT: String(PORT) }),
        stdio: "ignore"
    });
    let failed = 0;
    const expectRejected = (name, body) => __awaiter(void 0, void 0, void 0, function* () {
        const status = yield post(body);
        if (status === 400) {
            console.log(`Automation case ${name} passed`);
        }
        else {
            console.log(`Automation case ${name} failed: expected 400 but got ${status}`);
            failed++;
        }
    });
    try {
        yield waitForServer();
        // email
        yield expectRejected("1 email without @", { name: "A", email: "not-an-email" });
        yield expectRejected("2 email without domain dot", { name: "A", email: "a@b" });
        yield expectRejected("3 email with space inside", { name: "A", email: "a b@c.co" });
        yield expectRejected("4 email missing", { name: "A" });
        yield expectRejected("5 email not a string", { name: "A", email: 123 });
        yield expectRejected("6 email empty", { name: "A", email: "" });
        // age
        yield expectRejected("7 age negative", { name: "A", email: "a@b.co", age: -1 });
        yield expectRejected("8 age decimal", { name: "A", email: "a@b.co", age: 1.5 });
        yield expectRejected("9 age string", { name: "A", email: "a@b.co", age: "20" });
        yield expectRejected("10 age null", { name: "A", email: "a@b.co", age: null });
        // name
        yield expectRejected("11 name missing", { email: "a@b.co" });
        yield expectRejected("12 name blank", { name: "   ", email: "a@b.co" });
    }
    catch (error) {
        console.log(`Automation test error: ${error}`);
        failed++;
    }
    finally {
        server.kill();
    }
    if (failed > 0) {
        process.exit(1);
    }
});
automation_test();
