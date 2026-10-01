"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Utils_1 = require("./Utils");
const app = express();
const port = Number(process.env.PORT) || 3000;
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
// GET /add?a=1&b=2 -> {"result":3}
app.get("/add", (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    res.json({ result: Utils_1.Utils.add(a, b) });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
