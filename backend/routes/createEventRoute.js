import { Router } from 'express';
import createEvent from '../controllers/createEvent.js';

const router = Router();

router.post('/' ,createEvent);

export default router;