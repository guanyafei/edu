import express from 'express';
import * as managerCtr from '../controllers/managerController';
const router = express.Router();

router
    .get('/advert/register', managerCtr.showRegister)
    .post('/advert/register', managerCtr.doRegister)
    .get('/advert/login', managerCtr.showLogin)
    .post('/advert/login', managerCtr.doLogin);

export default router;
