"use strict";

var util = require('util'),
    OAuthUtils = require('../../util/OAuthUtils'),
    async = require('async'),
    _und = require('underscore');

var CredentialsStore = require('../../lib/CredentialsStore'),
    credentialsStore = new CredentialsStore({});

function _tryLogin(mirrorClient, code, cb){
    console.log("trying getTokens with code:: " + code );
    mirrorClient.getTokens(code, function(err, creds){
        if(err) return cb(err);

        console.log(" getTokens returned creds: ", creds);

        mirrorClient.oauth2Client.credentials = creds;

        OAuthUtils.getUserInfo( mirrorClient.oauth2Client, creds, function(err, res){
            if(err) return cb(err);

            console.log("getUserInfo res:", res); 

            credentialsStore.storeCredentials( res.id, creds, function(err, res){
                if(err) return cb(err);
                mirrorClient.createClient(function(err, res){
                    if(err) return cb(err);
                    cb(null, res);
                });
            });
        });
    });
}


exports.getOauthCallback = function(req, res, next){
    if(req.query.code) {
        _tryLogin(req.app.locals.mirrorClient, req.query.code, function(err, credsRes){
            if(err) return res.redirect( req.app.locals.mirrorClient.getAuthUrl() );
            res.redirect('/');
            //next();
        });
    } else if(!req.session.userId){
        res.redirect( req.app.locals.mirrorClient.getAuthUrl() );
    } else {
        credentialsStore.getStoredCredentials( req.session.userId, function(err, creds){
            if(err) return res.redirect( req.app.locals.mirrorClient.getAuthUrl() );
            var code = require('querystring').stringify( JSON.parse(creds) );  

            _tryLogin(req.app.locals.mirrorClient, code, function(err, credsRes){
                if(err) return res.redirect( req.app.locals.mirrorClient.getAuthUrl() );
                res.redirect('/');
                //next();
            });
        });
    }
};
