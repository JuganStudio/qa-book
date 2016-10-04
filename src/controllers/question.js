import { Router } from 'express';
import logger from '../utils/logger';
import { createQuestion, getRecentQuestion } from '../models/question';

const router = Router();

router.get('/', async (req, res) => {
    try {
        logger.info('GET', '/api/question');

        const question = await getRecentQuestion();

        res.json({ question });
    } catch (err) {
        logger.error(err);

        res.status(500);
        res.json({ error: err });
    }
});

router.post('/', async (req, res) => {
    try {
        logger.info('POST', '/api/question');

        const { context } = req.body;
        const newQuestion = await createQuestion(context);

        res.json({ newQuestion });
    } catch (err) {
        logger.error(err);

        res.status(500);
        res.json({ error: err });
    }
});

export default router;
