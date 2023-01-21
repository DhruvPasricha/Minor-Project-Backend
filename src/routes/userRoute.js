import express from 'express';
import { createUser, getUser } from '../controllers/userController.js';

const userRoutes = express.Router();
userRoutes.route('/create').post(createUser);
userRoutes.route('/:id').get(getUser);

export default userRoutes;
