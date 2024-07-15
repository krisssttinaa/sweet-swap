const Message = require('../models/message');

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.getAllMessages();
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getMessageById = async (req, res) => {
    try {
        const message = await Message.getMessageById(req.params.id);
        res.json(message);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createMessage = async (req, res) => {
    const messageData = req.body;
    try {
        const result = await Message.createMessage(messageData);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};