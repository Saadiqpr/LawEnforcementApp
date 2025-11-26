const router = require('express').Router();
// Import the master dictionary of all our Mongoose models
const models = require('../models/allSchemas');

// === HELPER FUNCTION ===
// Safely get the correct Model based on the collection name URL parameter
const getModel = (collectionName, res) => {
    const lowerCaseName = collectionName.toLowerCase();
    const Model = models[lowerCaseName];
    if (!Model) {
        // If the collection name doesn't exist in our master file, send an error
        res.status(404).json(`Error: Collection/Model '${collectionName}' not found.`);
        return null;
    }
    return Model;
};


// ==========================================
//  THE "MATH" SECTION (Aggregation Pipeline)
// ==========================================
// POST /api/dynamic/:collectionName/math/group-by
// Body: { "groupByField": "fieldName" }
router.route('/:collectionName/math/group-by').post(async (req, res) => {
    const Model = getModel(req.params.collectionName, res);
    if (!Model) return; // Exit if model not found

    const groupByField = req.body.groupByField;
    if (!groupByField) return res.status(400).json("Error: Missing 'groupByField'.");

    try {
        // Use Mongoose's powerful aggregate function
        const report = await Model.aggregate([
            {
                $group: {
                    _id: "$" + groupByField, // e.g., "$crimeType"
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);
        res.json(report);
    } catch (err) { res.status(400).json('Aggregation Error: ' + err.message); }
});


// ==========================================
//  THE UNIVERSAL Mongoose CRUD SECTION
// ==========================================

// --- READ (GET ALL) ---
router.route('/:collectionName').get(async (req, res) => {
    const Model = getModel(req.params.collectionName, res);
    if (!Model) return;

    try {
        // Mongoose .find() is cleaner than raw DB calls
        const data = await Model.find().sort({ createdAt: -1 }).limit(200);
        res.json(data);
    } catch (err) { res.status(400).json('Error fetching data: ' + err.message); }
});

// --- CREATE (POST) ---
router.route('/:collectionName').post(async (req, res) => {
    const Model = getModel(req.params.collectionName, res);
    if (!Model) return;

    try {
        // Create a new document instance from the request body
        const newItem = new Model(req.body);
        // .save() triggers Mongoose validation defined in your schema
        const savedItem = await newItem.save();
        res.json({ message: 'Document created successfully!', result: savedItem });
    } catch (err) { 
        // Mongoose gives good validation error messages
        res.status(400).json('Validation Error: ' + err.message); 
    }
});

// --- UPDATE (PUT) ---
router.route('/:collectionName/:id').put(async (req, res) => {
    const Model = getModel(req.params.collectionName, res);
    if (!Model) return;

    try {
        // findByIdAndUpdate handles finding by _id and updating safely
        const updatedItem = await Model.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Return the updated doc and run validation
        );
        if (!updatedItem) return res.status(404).json('Document not found.');
        res.json({ message: 'Document updated successfully!', result: updatedItem });
    } catch (err) { res.status(400).json('Update Error: ' + err.message); }
});

// --- DELETE (DELETE) ---
router.route('/:collectionName/:id').delete(async (req, res) => {
    const Model = getModel(req.params.collectionName, res);
    if (!Model) return;

    try {
        const deletedItem = await Model.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json('Document not found.');
        res.json({ message: 'Document deleted successfully!', result: deletedItem });
    } catch (err) { res.status(400).json('Delete Error: ' + err.message); }
});

module.exports = router;