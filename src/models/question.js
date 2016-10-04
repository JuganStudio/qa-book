/* eslint no-underscore-dangle:0 */

import Question from './question.schema';
import logger from '../utils/logger';

export async function createQuestion(context) {
    try {
        logger.info('createQuestion');

        const question = new Question({ context });
        const result = await question.save();

        logger.info(`id: ${result._id}, context: ${result.context}`);

        return Promise.resolve(result);
    } catch (err) {
        logger.error(err);

        return Promise.reject(err);
    }
}

export async function getRecentQuestion() {
    try {
        logger.info('getRecentQuestion');

        const question = await Question.findOne().sort({ date: -1 });

        if (!question) {
            logger.error('no result found');
            return Promise.reject({ msg: 'Not Found' });
        }

        logger.info(`id: ${question._id}, context: ${question.context}, date: ${question.date}`);

        return Promise.resolve(question);
    } catch (err) {
        logger.error(err);

        return Promise.reject(err);
    }
}
