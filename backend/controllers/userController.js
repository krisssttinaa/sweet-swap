const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password, name, surname, country } = req.body;
    try {
        console.log('Register request body:', req.body);

        let user = await User.authUser(username);
        if (user.length > 0) {
            console.log('User already exists:', username);
            return res.status(400).json({ msg: 'User already exists' });
        }

        console.log('Hashing password...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log('Creating user...');
        const createdUser = await User.createUser({
            username,
            password: hashedPassword,
            email,
            name,
            surname,
            country,
            role: 'user',
            dietary_goals: null,
            registration_date: new Date(),
            amount_achievements: 0
        });

        console.log('User created successfully:', createdUser);
        return res.status(201).json({ msg: 'User registered successfully. Please log in.' });

    } catch (err) {
        console.error('Server error during registration:', err.message);
        return res.status(500).json({ error: 'Server error during registration' });
    }
};


exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        console.log('Login endpoint hit');
        let user = await User.authUser(username);
        if (user.length === 0) {
            console.log('User not found');
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const hashedPassword = user[0].password;
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = { user: { id: user[0].user_id, username: user[0].username } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({
                token,
                user: {
                    id: user[0].user_id,
                    username: user[0].username,
                    email: user[0].email,
                    name: user[0].name,
                    surname: user[0].surname,
                }
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
  
exports.profile = async (req, res) => {
    try {
        const user = await User.getUserById(req.user.id);
        res.json(user[0]); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.getUserById(req.params.id);
        if (!user.length) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateProfile = async (req, res) => {
    console.log('Request user:', req.user);  // Add this line

    const { name, surname, email, password, dietaryGoals } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.getUserById(userId);
        if (!user.length) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const updatedUser = {
            name: name || user[0].name,
            surname: surname || user[0].surname,
            email: email || user[0].email,
            dietary_goals: dietaryGoals || user[0].dietary_goals,
        };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedUser.password = await bcrypt.hash(password, salt);
        }

        await User.updateUser(userId, updatedUser);
        res.json({ msg: 'Profile updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};