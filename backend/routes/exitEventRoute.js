import { Router } from 'express';
import exitEvent from '../controllers/exitEventController.js';

const router = Router();

router.post('/:id' ,exitEvent);

export default router;