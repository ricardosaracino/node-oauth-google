import {Injectable, MiddlewareFunction, NestMiddleware} from '@nestjs/common';

import * as passport from 'passport';

@Injectable()
export class GooglePassportMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction {
        return (req, res, next) => {

            console.log('passport auth middleware'); // DONT call next

            passport.authenticate('google', {failureRedirect: 'http://localhost:4200/login#ERROR'})(req, res, next);
        };
    }
}