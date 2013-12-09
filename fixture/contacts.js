"use strict";

var config = require('../config');

module.exports = [
    {
        id: "harold",
        displayName: "Harold Penguin",
        iconUrl: "https://developers.google.com/glass/images/harold.jpg",
        priority: 7,
        acceptCommands: [
            { type: "POST_AN_UPDATE" },
            { type: "TAKE_A_NOTE" }
        ]
    }
];
