// 1. Import required libraries
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 2. Initialize the application
const app = express();
const PORT = process.env.PORT || 5000;

// 3. Middleware setup
app.use(cors());
app.use(express.json());
// --- NEW LINES TO ADD ---
// Tell the server to use the incidents route file
const incidentsRouter = require('./routes/incidents');
// Open the window! Any URL starting with '/api/incidents' goes to that file.
app.use('/api/incidents', incidentsRouter);
// ------------------------

// 4. Database Connection
// Get the connection string from the secret .env file
const uri = process.env.MONGODB_URI;

// Connect to MongoDB using Mongoose
// NEW CORRECT CODE
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log(">>> MongoDB database connection established successfully! <<<");
});

// 5. Basic Route (for testing)
app.get('/', (req, res) => {
    res.send('CDIS Backend Server is running and connected to database!');
});

// 6. Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});