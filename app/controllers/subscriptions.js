"use strict";

var util = require('util'),
    _und = require('underscore'),
    subscriptionFixtures = require('../../fixture/subscriptions');

exports.insertSubscription = function(req, res) {
    var subscription = { };
    var subscription = _und.sample( subscriptionFixtures );
    req.app.locals.mirrorClient.insertSubscription(subscription, function(err){
        if(err) return res.error(err);
        res.json({});

    });
}

exports.deleteSubscription = function(req, res) {
    var subscription = {

    };
    req.app.locals.mirrorClient.deleteSubscription(subscription, function(err){
        if(err) return res.error(err);
        res.json({});

    });
}

exports.getNotificationCallback = function(req, res) {

    res.json({});
}
