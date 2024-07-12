const express = require('express');
require('dotenv').config();
const db = require('./db.js'); // Import the database connection

const app = express();
const port = process.env.PORT || 8211;

app.get("/", (req, res) => {
    res.send("hola");
});

/// App listening on port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
