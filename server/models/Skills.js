const mongoose = require('mongooose');

const skillSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'  // This connects the skill to the user who posted it
    },

    title: {
        type: String,
        required: [true, 'Please add a title'], // example: "Math tutoring"
        trim: true
    },
    
    description: {
        type: String,
        required:true,
        enum: ['Education', 'Household', 'Tech', 'Art', 'Other']
    },

    location: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Skill', skillSchema);