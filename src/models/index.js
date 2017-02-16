import mongoose from 'mongoose';
import Advert from './advertModel';
import Manager from './managerModel';

mongoose.connect('mongodb://127.0.0.1:27017/edu');

export {
	Manager,
	Advert
}