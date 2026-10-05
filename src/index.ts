import express = require('express');
import path = require('path');
import userRoutes = require('./UserRoutes');

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/users", userRoutes);

// Simple frontend (public/index.html) served at /app
app.use("/app", express.static(path.join(__dirname, "..", "public")));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
