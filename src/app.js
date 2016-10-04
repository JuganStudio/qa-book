import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import controllers from './controllers';

import logger from './utils/logger';
import config from '../config.json';

const app = express();

app.set('port', config.port);
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/../views`);
app.use(express.static(`${__dirname}/../public`));

app.use(bodyParser.json());
app.use(helmet());

app.use(controllers);

export default () => {
    http.createServer(app).listen(app.get('port'), () => {
        logger.info(`Express server listening on port ${app.get('port')}`);
    });
};
