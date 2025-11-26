const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// This blueprint matches the data structure you showed me from MongoDB Compass
const incidentSchema = new Schema({
    incidentID: {
        type: String,
        required: true,
        unique: true // Ensures no two incidents have the same ID
    },
    title: {
        type: String,
        required: true
    },
    crimeType: {
        type: String,
        required: true
    },
    date: {
        type: Date, // Mongoose will automatically handle date strings
        required: true
    },
    locationID: {
        type: String, // Keeping as string to match your data for now
        required: true
    }
}, {
    timestamps: true, // Adds 'createdAt' and 'updatedAt' times automatically
});

// We tell Mongoose: "Use this schema for the 'Incident' model."
// Mongoose automatically looks for a collection named "incidents" (lowercase plural) in your DB.
const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;