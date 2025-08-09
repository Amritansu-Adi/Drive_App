const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Signup attempt:', { username, email });
    // console.log('Request body:', req.body);
    
    try {
        let user = await User.findOne({ email });
        if (user) {
            console.log('User already exists:', email);
            return res.status(400).json({ msg: 'User already exists' });
        }
        
        user = new User({ username, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        console.log('New user created:', user._id);

        const userP = { user: { id: user.id } };
        jwt.sign(userP, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 12}, (err, token) => {
            if (err) throw err;
            // console.log('Token generated for user:', user.id);
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        // console.error('Signup error:', err);
        res.status(500).send('Server error');
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        let user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // console.log('Password mismatch for:', email);
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        console.log('Login successful for:', email);
        const userP = { user: { id: user.id } };
        jwt.sign(userP, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            // console.log('JWT token:', token.substring(0, 20) + '...');
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    signup,
    login
    // logout
};