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
const Utils_1 = require("./Utils");
// Automation test: (1) checks the email utils, (2) starts the real server and
// sends HTTP requests to check email and age validation. No database needed: invalid input is rejected
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
// Utils checks run in-process: email must not be blank, email must not be a duplicate.
const util_checks = () => {
    const cases = [
        ["1 email empty is blank", Utils_1.Utils.isBlank("   ") === true],
        ["2 duplicate email found (ignores case)", Utils_1.Utils.isDuplicateEmail(" SomChai@Example.COM ", ["somchai@example.com"]) === true]
    ];
    let bad = 0;
    for (const [name, ok] of cases) {
        if (ok) {
            console.log(`Automation case ${name} passed`);
        }
        else {
            console.log(`Automation case ${name} failed`);
            bad++;
        }
    }
    return bad;
};
const automation_test = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = (0, child_process_1.spawn)(process.execPath, [path.join(__dirname, "index.js")], {
        env: Object.assign(Object.assign({}, process.env), { PORT: String(PORT) }),
        stdio: "ignore"
    });
    let failed = util_checks();
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
        yield expectRejected("3 invalid email", { name: "A", email: "not-an-email" });
        yield expectRejected("4 negative age", { name: "A", email: "a@b.co", age: -1 });
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
