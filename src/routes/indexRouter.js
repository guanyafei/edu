import express from 'express';
import * as index  from '../controllers/indexController';

const router = express.Router();


router.get('/', index.showIndex);
export default router; 