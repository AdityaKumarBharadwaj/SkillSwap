const express = require('express');
const router = express.Router();
const {getSkills, createSkill } = require('../controllers/skillControllers');
const { protect } = require('../middleware/authMiddleware');

// Route: /api/skills
// GET: Anyone can see skills
// POST: Only logged-in users (protect) can add skills
router.route('/').get(getSkills).post(protect, createSkill);

module.exports = router;