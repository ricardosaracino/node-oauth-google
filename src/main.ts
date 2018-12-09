import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

import * as passport from 'passport';
import * as session from 'express-session';
import sessionFileStore = require('session-file-store');


async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    const FileStore = sessionFileStore(session);

    app.use(session({
            store: new FileStore({}),
            resave: false,
            saveUninitialized: false,
            secret: 'asdf',
            signed: true
        }
    ));

    app.use(passport.initialize());

    app.use(passport.session());


    const server = await app.listen(3000, () => {
        const port = server.address().port;
        console.log(`App listening on port ${port}`);
    });
}

bootstrap();
