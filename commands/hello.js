const { callSendAPI } = require('../utils/apiMessenger'); // Import callSendAPI function from utils/apiMessenger module

module.exports = {
    name: 'hello', // Command name

    async execute(event) { // Command function
        try {
            const { sender } = event; // Get sender object from event object

            const message = { // Create message object
                text: 'Hello, I\'m a bot'
            };

            await callSendAPI(sender.id, message); // Call callSendAPI function to send message to user
        } catch (error) { // Catch error
            logger.error('Hello', error); // Log error
        }
    }
};