import {Injectable} from '@nestjs/common';

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
    accessType: 'offline',
    passReqToCallback: true

}, (req, accessToken, refreshToken, profile, done) => {
    // Extract the minimal profile information we need from the profile object
    // provided by Google

    // todo SOMETHING COOL HERE ???
    //http://www.passportjs.org/docs/google/

    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //     return done(err, user);
    // });


    console.log('accessToken ', accessToken);
    console.log('refreshToken ', refreshToken);
    console.log('profile ', profile);

    // this info is in req.user
    done(null, {...{uuid: 'xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx'}, ...extractProfile(profile)});
}));


passport.serializeUser((user, done) => {
    console.log('serializeUser');
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    console.log('deserializeUser');
    done(null, obj);
});


@Injectable()
export class AuthService {

    public authenticate(req, res, next) {

        // Start OAuth 2 flow using Passport.js
        passport.authenticate('google', {scope: ['email', 'profile']}, function (err, user, info) {
            if (err) return next(err);

            console.log(err, user, info);

            next('route');
        })(req, res, next);
    }
}
