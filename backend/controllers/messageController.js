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
    const { sender_id, receiver_id, content, date_sent } = req.body;
    try {
        const newMessage = await Message.createMessage(sender_id, receiver_id, content, date_sent);
        res.json(newMessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};