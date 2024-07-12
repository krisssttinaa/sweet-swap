const express = require('express');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 8188;
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(express.json());

// Routes
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/userRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const commentRoutes = require('./routes/commentRoutes');
const messageRoutes = require('./routes/messageRoutes');
const postRoutes = require('./routes/postRoutes');
const productRoutes = require('./routes/productRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const reportRoutes = require('./routes/reportRoutes');

app.use('/api', indexRoutes);
app.use('/api/users', userRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/products', productRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/reports', reportRoutes);

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