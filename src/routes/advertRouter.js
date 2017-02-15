import express from 'express';
import * as advert from '../controllers/advertController';

const router = express.Router(); 

router
    .post('/advert/add', advert.addAdvert)
    .get('/advert/count', advert.paginationAdvert)
    .get('/advert/add',advert.showAddPage)
    .get('/advert',advert.showListPage)
    .get('/advert/list', advert.queryAdvert)
    .get('/advert/one/:advertId', advert.likeFind)
    .post('/advert/edit', advert.editAdvert)
    .get('/advert/edit/:advertId', advert.showEditPage)
    .get('/advert/remove/:advertId',advert.removeAdvert);

export default router;
