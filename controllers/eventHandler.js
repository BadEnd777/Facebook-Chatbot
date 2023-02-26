const path = require('path');
const fs = require('fs');

module.exports = (event) => {
    if (!event.message && !event.postback) return; // Check if event object has message or postback property

    if (event.message) { // Check if event object has message property
        if (!event.message.text) return; // Check if event object has text property

        try { // Try to execute code
            const message = event.message.text.toLowerCase(); // Get text from message object and convert it to lowercase
            const commands = fs.readdirSync(path.join(__dirname, '../commands')); // Get all files from commands folder
            for (const command of commands) { // Loop through all files
                const commandFile = require(path.join(__dirname, `../commands/${command}`)); // Require command file
                if (commandFile.name === message) { // Check if command name is equal to message
                    commandFile.execute(event); // Execute command function
                }
            }
        } catch (error) { // Catch error
            logger.error('EventHandler', error); // Log error
        }
    }
};