"use strict";

var util = require('util'),
    _und = require('underscore');

var CredentialsStore = require('../../lib/CredentialsStore'),
    credentialsStore = new CredentialsStore({});

function _tryLogin(client, code, cb){
    mirrorClient.getTokens( req.query.code, function(err, creds){
        if(err) return cb(err);
        credentialsStore.storeCredentials( creds.userId, creds );
        client.createClient(function(err, res){
            if(err) return cb(err);
            cb(null, res);
        });
    });
}


exports.getOauthCallback = function(req, res, next){
    if(req.query.code) {
        _tryLogin(req.app.locals.mirrorClient, req.query.code, function(err, credsRes){
            if(err) return res.redirect('/');
            next();
        });
    } else if(req.session.userId){
        credentialsStore.getStoredCredentials( req.session.userId, function(err, creds){
            if(err) return res.redirect('/'); 
            var code = require('querystring').stringify( JSON.parse(creds) );  

            _tryLogin(req.app.locals.mirrorClient, code, function(err, credsRes){
                if(err) return res.redirect('/');
                next();
            });
        });
    } else {
        res.redirect('/');
    }
};
