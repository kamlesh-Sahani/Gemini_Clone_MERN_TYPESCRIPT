import express from 'express';
import { getUser, isExist, newUser } from '../controller/User.js';

const router = express.Router();

router.post('/new',newUser);
router.post('/login',getUser);
router.post('/isuser',isExist);

export default router;