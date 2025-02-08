import { Router } from 'express';
import joinEvent from '../controllers/joinEventController.js';

const router = Router();

router.post('/:id' ,joinEvent);

export default router;