const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: ['Education', 'Household', 'Tech', 'Art', 'Sports', 'Other'] 
    },
    location: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('Skill', skillSchema);