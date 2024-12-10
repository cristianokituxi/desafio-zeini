import express from 'express';
import { login} from '../controllers/authController';
import { authenticate } from '../middleware/authmiddleware';

const router = express.Router();

router.post('/login', login);
router.post('/verify', authenticate)


export default router;
