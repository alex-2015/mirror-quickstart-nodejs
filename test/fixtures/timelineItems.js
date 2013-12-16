"use strict";

var config = require('../config');

module.exports = [
    {
        text: 'What did you have for lunch?',
        speakableText: 'What did you eat? Bacon?',
        notification: { level: 'DEFAULT' },
        menuItems: [
            { action: 'REPLY' },
            { action: 'READ_ALOUD' },
            { action: 'SHARE' },
            { 
                action: 'CUSTOM', 
                id: 'safe-for-later', 
                values: [
                    {
                        displayName: 'Drill Into',
                        iconUrl: config.host + ':' + config.port + "/images/drill.png"
                    }
                ] 
            }
        ]
    },
    {
        text: "Did you know cats have 167 bones in their tails?  Mee-wow!"
        menuItems: [{
            { action: "DELETE" },
            { action: "SHARE" }
        ]
    },
    {
        text: 'Welcome to the Mirror API Node.js Quick Start'
    }
];
