import express from 'express';
import * as managerCtr from '../controllers/managerController';
const Router =express.Router();

Router
    .get('/advert/register',managerCtr.showRegister);

    export default Router; 