const Skill = require('../models/Skills');

// @desc Get all the skills (Feed)
// @route  GET /api/skills
// @ access
const getSkills = async (req, res) => {
    // Sort by newest first
    const skills = await Skill.find().populate('user', 'name location ').sort({createdAt: -1});
    res.json(skills);
};

const createSkill = async (req, res) => {
    const { title, description, category, location} = req.body;
    if(!title || !description || !category) {
        return res.status(404).json({message: 'Please add al the fields'});
    };

    const skill = await Skill.create({
        user: req.user.id,  // we get this 'protect' middleware
        title,
        description,
        category,
        location: location || req.user.location // use user's location if not specified;
    });
};

module.exports = { getSkills, createSkill }; 