import {Controller, Get, Next, Req, Res, UnauthorizedException} from '@nestjs/common';
import {AuthService} from "./auth.service";


/**
 * https://cloud.google.com/nodejs/getting-started/authenticate-users
 *
 * https://auth0.com/docs/connections/social/google
 *
 * https://github.com/GoogleCloudPlatform/nodejs-getting-started/blob/8bb3d70596cb0c1851cd587d393faa76bfad8f80/4-auth/app.js
 *
 * https://console.developers.google.com/apis/api/plus.googleapis.com/overview?project=decisive-triode-224921
 *
 * http://www.passportjs.org/docs/oauth2-api/
 */

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Get('login')
    public async login(@Req() req, @Res() res, @Next() next) {

        console.log('login');

        if (req.query.return) {
            req.session.oauth2return = req.query.return;
        }

        this.authService.authenticate(req, res, next);
    }

    @Get('google/callback')
    public async googleCallback(@Req() req, @Res() res, @Next() next) {

        // todo This has GooglePassportMiddleware make annotation

        console.log('google/callback');

        const redirect = req.session.oauth2return || 'http://localhost:4200/';

        delete req.session.oauth2return;

        res.redirect(redirect);
    }

    @Get('user')
    public async user(@Req()req) {

        // todo make annotation
        if (!req.isAuthenticated()) {
            throw new UnauthorizedException();
        }

        return {
            status: 'success',
            data: {user: req.user}
        };
    }

    @Get('logout')
    public async logout(@Req() req, @Res() res) {

        req.logout(); // session ... "passport":{}

        //req.session.destroy();

        res.redirect('/');


        return {
            status: 'success',
        }
    }
}
