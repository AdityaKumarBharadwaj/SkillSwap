const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email id'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minLenght: 6,
        select: false // When we fetch a user, don't return the password by default
    },
    location: {
        type: String,  // E.g., "Brooklyn, NY"
        required: true
    },

    skillsOffered: [{
        type: String,  // E.g., ["Math Tutoring", "Plumbing"]
        trim: true
    }],
    timeCredits: {
        type: Number,
        default: 3   // Give new users 3 free hours to start!
    },
    rating: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema)