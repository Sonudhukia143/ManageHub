import { Router } from 'express';
import deleteEvent from '../controllers/deleteEvents.js';

const router = Router();

router.post('/' ,deleteEvent);

export default router;