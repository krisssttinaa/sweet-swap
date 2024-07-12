const express = require('express');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 8188;
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(express.json());

// Routes
const routes = require('./routes');
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`Server started on port ${port}`);
});