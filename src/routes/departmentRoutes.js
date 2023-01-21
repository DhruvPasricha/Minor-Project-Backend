import express from 'express';
import { createDepartment, getDepartment } from '../controllers/departmentController.js';

const departmentRoutes = express.Router();
departmentRoutes.route('/').post(createDepartment);
departmentRoutes.route('/:id').get(getDepartment);

export default departmentRoutes;
