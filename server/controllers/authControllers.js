const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
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
        return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Create new user
    // The .pre('save') middleware in User.js will handle the password hashing automatically
    let user;
    try {
        user = await User.create({
            name,
            email,
            password,
            location
        });
    } catch (error) {
        return res.status(400).json({message: error.message});
    }

    if(user) {
        // 3. Send back the User Info and the token (key card)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            location: user.location,
            token: generateToken(user._id),
        });
    }else {
        res.status(400).json({message: 'Invalid user data'});
    }
};

// @desc  Auth user and get token
// @route POST /api/auth/login
// @access Public

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // 1. Find user by email
    // We explicitly ask for the password because we set select: false in the model
    const user = await User.findOne({email}).select('+password');

    // 2. Check if user exists and password matches
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            location: user.location,
            token: generateToken(user._id),
        });
    }else {
        res.status(401).json({message: 'Invalid email or password'});
    }
}

module.exports = {registerUser, loginUser};