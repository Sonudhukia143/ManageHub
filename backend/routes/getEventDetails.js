import { Router } from 'express';
import getEventDetails from '../controllers/eventDetails.js';

const router = Router();

router.get('/:id' , getEventDetails);

export default router;