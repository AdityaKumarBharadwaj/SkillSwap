const Skill = require('../models/Skills');
const Request = require('../models/Requests');
const User = require('../models/Users');

// @desc Get all the skills (Feed)
// @route  GET /api/skills
// @ access Public
const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find().populate('user', 'name location rating timeCredits').sort({createdAt: -1});
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc Create a skill
// @route POST /api/skills
// @access Private
const createSkill = async (req, res) => {
    try {
        const { title, description, category, location} = req.body;
        if(!title || !description || !category) {
            return res.status(400).json({message: 'Please add all the fields'});
        };

        const skill = await Skill.create({
            user: req.user.id,
            title,
            description,
            category,
            location: location || req.user.location
        });
        res.status(201).json(skill);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc Delete a skill
// @route DELETE /api/skills/:id
// @access Private
const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        // Make sure user owns the skill
        if (skill.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to delete this skill' });
        }

        await skill.deleteOne();
        res.json({ message: 'Skill removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// --- REQUEST CONTROLLERS ---

// @desc Request a skill
// @route POST /api/skills/:id/request
// @access Private
const requestSkill = async (req, res) => {
    try {
        const skillId = req.params.id;
        const skill = await Skill.findById(skillId);

        if (!skill) return res.status(404).json({ message: 'Skill not found' });

        if (skill.user.toString() === req.user.id) {
            return res.status(400).json({ message: 'You cannot request your own skill' });
        }

        // Check if user has enough time credits (Optional: strictly enforce it)
        const requester = await User.findById(req.user.id);
        if (requester.timeCredits < 1) {
            return res.status(400).json({ message: 'Not enough Time Credits. Earn more by offering skills!' });
        }

        // Check if already requested
        const existingReq = await Request.findOne({
            requester: req.user.id,
            skill: skillId,
            status: { $in: ['pending', 'accepted'] }
        });

        if (existingReq) {
            return res.status(400).json({ message: 'You already have an active request for this skill' });
        }

        const request = await Request.create({
            requester: req.user.id,
            provider: skill.user,
            skill: skillId
        });

        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc Update request status (Accept/Reject/Complete)
// @route PUT /api/skills/requests/:requestId
// @access Private
const updateRequestStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const request = await Request.findById(req.params.requestId).populate('requester').populate('provider');

        if (!request) return res.status(404).json({ message: 'Request not found' });

        // Only provider can accept/reject/complete (in a real app, maybe requester completes it, but for simplicity provider marks it complete)
        if (request.provider._id.toString() !== req.user.id && request.requester._id.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        request.status = status;
        await request.save();

        // If completed, transfer 1 Time Credit from requester to provider
        if (status === 'completed') {
            const requester = await User.findById(request.requester._id);
            const provider = await User.findById(request.provider._id);

            requester.timeCredits -= 1;
            provider.timeCredits += 1;

            await requester.save();
            await provider.save();
        }

        res.json(request);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc Get user's requests (both incoming and outgoing)
// @route GET /api/skills/requests/me
// @access Private
const getMyRequests = async (req, res) => {
    try {
        const incoming = await Request.find({ provider: req.user.id }).populate('requester', 'name').populate('skill', 'title');
        const outgoing = await Request.find({ requester: req.user.id }).populate('provider', 'name').populate('skill', 'title');

        res.json({ incoming, outgoing });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getSkills, createSkill, deleteSkill, requestSkill, updateRequestStatus, getMyRequests };