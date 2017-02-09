import express from 'express';
import index from './controller/index'; 
import * as advert from './controller/advert'; 

const router = express.Router();


router.get('/', index);

router.post('/advert/add',advert.addAdvert);

export default router;