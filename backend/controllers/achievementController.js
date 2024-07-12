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
    const { user_id, achievement_name, description, date_achieved } = req.body;
    try {
        const newAchievement = await Achievement.createAchievement(user_id, achievement_name, description, date_achieved);
        res.json(newAchievement);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};