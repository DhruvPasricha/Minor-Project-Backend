import express from 'express';
import { createFile, getFile, getUserFiles } from '../controllers/fileController.js';
import { closeFile, dispatchFile, getFileHistory, receiveFile } from '../controllers/fileHistoryController.js';

const fileRoutes = express.Router();
fileRoutes.route('/:id').get(getFile);
fileRoutes.route('/user/:id').get(getUserFiles);
fileRoutes.route('/track/:id').get(getFileHistory);

fileRoutes.route('/create').post(createFile);
fileRoutes.route('/close').post(closeFile);
fileRoutes.route('/assign').post(dispatchFile);
fileRoutes.route('/receive').post(receiveFile);

export default fileRoutes;
