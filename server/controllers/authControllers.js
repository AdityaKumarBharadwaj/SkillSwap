const User = require('../models/Users');
const jwt = require('jsonwebtoken');

// Helper fucntion to generate Token
const generateToken = (id) => {
    return jwt.signal({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // token expires in 30 days;
    });
};

// @desc Register a new user
// @ route POST/api/auth/register
// @access Public
const registerUser = async (req, res) => {
    const {name, email, password, location} = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if(userExists) {
        return res.status(404).json({ message: 'User already exists' });
    }

    // 2. Create new user
    // The .pre('save') middleware in User.js will handle the password hashing automatically
    const user = await User.create({
        name,
        email,
        password,
        location
    });

    if(user) {
        // 3. Send back the User Info 
    }
}