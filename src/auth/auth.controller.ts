import {Controller, Get, Next, Req, Res, UnauthorizedException} from '@nestjs/common';


import * as passport from 'passport';


/**
 * https://cloud.google.com/nodejs/getting-started/authenticate-users
 *
 * https://auth0.com/docs/connections/social/google
 *
 * https://github.com/GoogleCloudPlatform/nodejs-getting-started/blob/8bb3d70596cb0c1851cd587d393faa76bfad8f80/4-auth/app.js
 *
 * https://console.developers.google.com/apis/api/plus.googleapis.com/overview?project=decisive-triode-224921
 */

@Controller('auth')
export class AuthController {

    @Get('login')
    public async login(@Req() req, @Res() res, @Next() next) {

        console.log('login');

        if (req.query.return) {
            req.session.oauth2return = req.query.return;
        }


// Start OAuth 2 flow using Passport.js
        passport.authenticate('google', {scope: ['email', 'profile']}, function (err, user, info) {
            if (err) return next(err);

            console.log(err, user, info);

            next('route');
        })(req, res, next);
    }

    @Get('google/callback')
    public async googleCallback(@Req() req, @Res() res, @Next() next) {

        // This has GooglePassportMiddleware

        console.log('google/callback');

        const redirect = req.session.oauth2return || 'http://localhost:4200/';
        delete req.session.oauth2return;
        res.redirect(redirect);
    }

    @Get('secure')
    public async function(@Req()req) {

        if (!req.isAuthenticated()) {
            throw new UnauthorizedException();
        }

        return {secure: true}
    }


    @Get('logout')
    public async logout(@Req() req, @Res() res) {
        req.logout();


        return {
            status: 'success',
        }
    }
}
