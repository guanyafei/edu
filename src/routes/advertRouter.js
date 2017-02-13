import express from 'express';
import * as advert from '../controllers/advertController';

const router = express.Router(); 

router
    .post('/advert/add', advert.addAdvert)
    .get('/advert/add',advert.showAddPage)
    .get('/advert',advert.showListPage)
    .get('/advert/list', advert.queryAdvert)
    .get('/advert/one/:advertId', advert.likeFind)
    .post('/advert/edit', advert.editAdvert)
    .get('/advert/remove/:addvertId',advert.removeAdvert);

export default router;
