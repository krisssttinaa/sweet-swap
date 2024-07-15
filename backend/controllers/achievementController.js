const Achievement = require('../models/achievement');

exports.getAllAchievements = async (req, res) => {
    try {
        const achievements = await Achievement.getAllAchievements();
        res.json(achievements);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getAchievementById = async (req, res) => {
    try {
        const achievement = await Achievement.getAchievementById(req.params.id);
        res.json(achievement);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createAchievement = async (req, res) => {
    const achievementData = req.body;
    try {
        const result = await Achievement.createAchievement(achievementData);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};