const express = require('express');
const router = express.Router();
const { getSkills, createSkill, deleteSkill, requestSkill, updateRequestStatus, getMyRequests } = require('../controllers/skillControllers');
const { protect } = require('../middleware/authMiddleware');

// Route: /api/skills
router.route('/').get(getSkills).post(protect, createSkill);

// Route: /api/skills/:id
router.route('/:id').delete(protect, deleteSkill);

// Route: /api/skills/requests/me
router.route('/requests/me').get(protect, getMyRequests);

// Route: /api/skills/:id/request
router.route('/:id/request').post(protect, requestSkill);

// Route: /api/skills/requests/:requestId
router.route('/requests/:requestId').put(protect, updateRequestStatus);

module.exports = router;