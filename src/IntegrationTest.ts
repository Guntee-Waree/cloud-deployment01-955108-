// Integration test: calls the running server over HTTP, so the Express routes
// and Utils are tested together. Start the server first (node dist/index.js).
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const integration_test = async () => {
    // test1: GET / returns the greeting
    const res1 = await fetch(`${BASE_URL}/`);
    const body1 = await res1.text();
    if (res1.status === 200 && body1 === "Hello, World!") {
        console.log("Integration case 1 passed: GET /");
    } else {
        console.log(`Integration case 1 failed: GET / -> ${res1.status} "${body1}"`);
        process.exit(1);
    }

    // test2: GET /add?a=1&b=2 goes through the route into Utils.add
    const res2 = await fetch(`${BASE_URL}/add?a=1&b=2`);
    const body2 = (await res2.json()) as { result: number };
    if (res2.status === 200 && body2.result === 3) {
        console.log("Integration case 2 passed: GET /add?a=1&b=2 -> 3");
    } else {
        console.log(`Integration case 2 failed: GET /add?a=1&b=2 -> ${res2.status} ${JSON.stringify(body2)} (expected 3)`);
        process.exit(1);
    }
};

integration_test().catch((err) => {
    console.log(`Integration test error: ${err}`);
    process.exit(1);
});
