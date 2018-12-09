import {Injectable, MiddlewareFunction, NestMiddleware} from '@nestjs/common';

import * as passport from 'passport';

const GoogleStrategy = require('passport-google-oauth20').Strategy;


const config = {
    "client_id": "521336069328-brur0ak3b06sljl6mtsgeon3p80fq40g.apps.googleusercontent.com",
    "project_id": "decisive-triode-224921",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://www.googleapis.com/oauth2/v3/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "HpeNSWOaPDbTFCxG0R5IczZ-",
    "redirect_uris": "http://localhost:3000/auth/google/callback"
};

function extractProfile(profile) {
    let imageUrl = '';
    if (profile.photos && profile.photos.length) {
        imageUrl = profile.photos[0].value;
    }
    return {
        id: profile.id,
        displayName: profile.displayName,
        image: imageUrl
    };
}

passport.use(new GoogleStrategy({
    clientID: config.client_id,
    clientSecret: config.client_secret,
    callbackURL: config.redirect_uris,
    accessType: 'offline'
}, (accessToken, refreshToken, profile, cb) => {
    // Extract the minimal profile information we need from the profile object
    // provided by Google

    //console.log(accessToken, refreshToken, profile);
    console.log('passport cb');
    cb(null, extractProfile(profile));
}));


passport.serializeUser((user, cb) => {
    console.log('serializeUser');
    cb(null, user);
});
passport.deserializeUser((obj, cb) => {
    console.log('deserializeUser');
    cb(null, obj);
});


@Injectable()
export class GooglePassportMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction {
        return (req, res, next) => {
            console.log('passport auth middleware');
            passport.authenticate('google')(req, res, next);
            next();
        };
    }
}