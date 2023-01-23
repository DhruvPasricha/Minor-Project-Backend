import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import QUERY from '../models/fileHistoryModel.js';
import FILE_QUERY from '../models/fileModel.js';
import HTTP_STATUS_CODES from '../domain/statusCodes.js';
import { updateFileStatus } from '../controllers/fileController.js';

export const dispatchFile = (request, response) => {
    console.log(request.method + ' ' + request.originalUrl + ' Transferring File');
    const { fileId, sender, receiver } = request.body;
    database.query(QUERY.DISPATCH_FILE, [fileId, sender, receiver], (error, results) => {
        console.log(error, results);
        if (results) {
            updateFileStatus(request, response, fileId, 'DISPATCHED');
        } else {
            const code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.code;
            const status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.status;
            const message = 'Internal Server Error';
            response.status(code).send(new Response(code, status, message, data));
        }
    });
};

export const closeFile = (request, response) => {
    console.log(request.method + ' ' + request.originalUrl + ' Closing File');
    const { fileId, userId } = request.body;
    database.query(QUERY.CLOSE_FILE, [fileId, userId], (error, results) => {
        console.log(error, results, fileId, 'CLOSED');
        let code, status, message;
        if (results) {
            updateFileStatus(request, response, fileId, 'CLOSED');
        } else {
            if (error) {
                code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.code;
                status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.status;
                message = 'Internal Server Error';
            } else {
                code = HTTP_STATUS_CODES.NOT_FOUND.code;
                status = HTTP_STATUS_CODES.NOT_FOUND.status;
                message = 'No User Found';
            }
            response.status(code).send(new Response(code, status, message));
        }
    });
};

export const receiveFile = (request, response) => {
    console.log(request.method + ' ' + request.originalUrl + ' Receiving File');
    const { fileId, sender, receiver } = request.body;
    database.query(QUERY.RECEIVE_FILE, [fileId, receiver, sender], (error, results) => {
        console.log(error, results);
        let code, status, message;
        if (results) {
            updateFileStatus(request, response, fileId, 'RECEIVED');
        } else {
            if (error) {
                code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.code;
                status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.status;
                message = 'Internal Server Error';
            } else {
                code = HTTP_STATUS_CODES.NOT_FOUND.code;
                status = HTTP_STATUS_CODES.NOT_FOUND.status;
                message = 'No User Found';
            }
            response.status(code).send(new Response(code, status, message));
        }
    });
};

export const getFileHistory = (request, response) => {
    console.log(request.method + ' ' + request.originalUrl + ' Getting File History');
    const { id: fileId } = request.params;
    database.query(FILE_QUERY.GET_FILE, [fileId], (error, results) => {
        console.log(error, results);
        let code, status, message, data;
        if (results && results[0]) {
            data = results[0];
            database.query(QUERY.GET_FILE_HISTORY, [fileId], (error, results) => {
                if (results) {
                    code = HTTP_STATUS_CODES.OK.code;
                    status = HTTP_STATUS_CODES.OK.status;
                    message = 'Fetched File';
                    data = {
                        ...data,
                        actions: results,
                    };
                } else {
                    if (error) {
                        code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.code;
                        status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.status;
                        message = 'Internal Server Error';
                    } else {
                        code = HTTP_STATUS_CODES.NOT_FOUND.code;
                        status = HTTP_STATUS_CODES.NOT_FOUND.status;
                        message = 'No File Found';
                    }
                }
                response.status(code).send(new Response(code, status, message, data));
            });
        } else {
            if (error) {
                code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.code;
                status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.status;
                message = 'Internal Server Error';
            } else {
                code = HTTP_STATUS_CODES.NOT_FOUND.code;
                status = HTTP_STATUS_CODES.NOT_FOUND.status;
                message = 'No File Found';
            }
            response.status(code).send(new Response(code, status, message, data));
        }
    });
};
