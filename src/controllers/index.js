import { Router } from 'express';
import logger from '../utils/logger';
import questionCtrl from './question';

const router = Router();

router.use('/api/question', questionCtrl);

router.get('/', (req, res) => {
    res.render('index');
});

export default router;
