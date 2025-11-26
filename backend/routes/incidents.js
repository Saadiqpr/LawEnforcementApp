const router = require('express').Router();
// Import the blueprint we just created
let Incident = require('../models/Incident');

// Action 1: GET ALL Incidents
// This handles requests to the main door of this service window (e.g., /api/incidents/)
router.route('/').get(async (req, res) => {
    try {
        // Ask the librarian to find ALL documents using the Incident blueprint
        const incidents = await Incident.find();
        // If successful, send the list back as JSON
        res.json(incidents);
    } catch (err) {
        // If something goes wrong, send an error message
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;