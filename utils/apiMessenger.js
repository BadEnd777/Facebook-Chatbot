const axios = require('axios'); // Import axios module

const { PAGES_TOKEN } = process.env; // Get PAGES_TOKEN from environment variables

module.exports = {
    callSendAPI: async (recipientId, messageData) => { // Create callSendAPI function
        try {
            const response = await axios({ // Use axios to send request
                method: 'post',
                url: `https://graph.facebook.com/v16.0/me/messages?access_token=${PAGES_TOKEN}`,
                data: { // Set data
                    recipient: {
                        id: recipientId // Set recipient id
                    },
                    message: messageData // Set message data
                }
            });
            return response; // Return response
        } catch (error) { // Catch error
            logger.error('callSendAPI', error); // Log error
        }
    },
    getProfile: async (userId) => { // Create getProfile function
        try {
            const response = await axios({ // Use axios to send request
                method: 'get',
                url: `https://graph.facebook.com/v16.0/${userId}?fields=first_name,last_name,profile_pic&access_token=${PAGES_TOKEN}`
            });
            return response; // Return response
        } catch (error) { // Catch error
            logger.error('getProfile', error); // Log error
        }
    }
};