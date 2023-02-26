// Importing the required modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

require('./lib/logger').init(); // Load logger and init it
require('dotenv').config(); // Load environment variables from .env file
require('colors'); // Use colors in console

// Parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get port from environment and store in Express.
const { PORT } = process.env;

// Define a default route to check if server is running
app.get('/', (req, res) => { 
    res.status(200).json({
        code: 200,
        message: 'Server is running'
    });
});

// Start the server on the specified port
app.listen(PORT, () => {
    logger.info('Server', `Server is running on port ${PORT}`);
});

// Use the webhook route from routes/webhook module
app.use('/webhook', require('./routes/webhook'));