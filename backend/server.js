const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware (Allows frontend to talk to backend, and parses JSON)
app.use(cors());
app.use(express.json());

// A simple route to test if the server is working
app.get('/', (req, res) => {
    res.send('CDIS Backend Server is alive and running!');
});

// Start the server listening on port 5000
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});