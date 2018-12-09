import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthController} from './auth/auth.controller';
import {GooglePassportMiddleware} from "./middleware/google-passport-middleware";
import {AuthService} from './auth/auth.service';


@Module({
    imports: [],
    controllers: [AppController, AuthController],
    providers: [AppService, AuthService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(GooglePassportMiddleware)
            .forRoutes({path: 'auth/google/callback', method: RequestMethod.ALL});
    }
}