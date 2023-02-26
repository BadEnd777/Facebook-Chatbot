const eventHandler = require('../controllers/eventHandler'); // Import eventHandler function from controllers/eventHandler module
const express = require('express'); // Import express module
const router = express.Router(); // Create router object

const { VERIFY_TOKEN } = process.env; // Get VERIFY_TOKEN from environment variables

router.get('/', (req, res) => { // Create GET route
    try { // Try to execute code
        const mode = req.query['hub.mode']; // Get mode from query 
        const token = req.query['hub.verify_token']; // Get verify token from query
        const challenge = req.query['hub.challenge']; // Get challenge from query
        if (mode && token) { // Check if mode and token exist
            if (mode === 'subscribe' && token === VERIFY_TOKEN) { // Check if mode is subscribe and token is correct
                res.status(200).send(challenge); // Send challenge
            } else { // If mode is not subscribe or token is not correct
                res.status(403).json({ // Send 403 Forbidden
                    code: 403,
                    message: 'Forbidden'
                });
            }
        } else { // If mode or token does not exist
            res.status(403).json({ // Send 403 Forbidden
                code: 403,
                message: 'Forbidden'
            });
        }
    } catch (error) { // Catch error
        res.status(500).json({ // Send 500 Internal Server Error
            code: 500,
            message: 'Internal Server Error'
        });
    }
});

router.post('/', (req, res) => { // Create POST route
    try { // Try to execute code
        const body = req.body; // Get body from request
        if (body.object === 'page') { // Check if body object is page
            body.entry.forEach(entry => { // Loop through all entries
                const webhookEvent = entry.messaging[0]; // Get first event from messaging array
                eventHandler(webhookEvent); // Execute eventHandler function
            });
            res.status(200).json({ // Send 200 OK
                code: 200,
                message: 'OK'
            });
        } else { // If body object is not page
            res.status(404).json({ // Send 404 Not Found
                code: 404,
                message: 'Not Found'
            });
        }
    } catch (error) { // Catch error
        res.status(500).json({ // Send 500 Internal Server Error
            code: 500,
            message: 'Internal Server Error'
        });
    }
});

module.exports = router;