import { Router } from 'express';
import getAllEvents from '../controllers/getAllEvents.js';

const router = Router();

router.get('/' ,getAllEvents);

export default router;