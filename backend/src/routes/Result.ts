import express from 'express';
import { getData, getSingleData, setData } from '../controller/Result.js';

const router = express.Router();

router.post('/new',setData);
router.get('/all/:user',getData)
router.get('/:id',getSingleData);

export default router;