const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    skill: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Skill'
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Request', requestSchema);
