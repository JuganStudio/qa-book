import mongoose from 'mongoose';
import logger from './utils/logger';
import config from '../config.json';

mongoose.Promise = global.Promise;

const { host, database } = config.db;
const db = mongoose.connection;

db.on('error', logger.error);
db.once('open', () => {
    logger.debug(`host: ${host}, db: ${database}`);
    logger.info('Connected to mongod server');
});

mongoose.connect(`mongodb://${host}/${database}`);

export default db;
