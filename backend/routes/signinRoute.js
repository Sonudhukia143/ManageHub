import { Router } from 'express';
import signupuser from '../controllers/signinController.js'

const router = Router();

router.post('/',signupuser);

export default router;