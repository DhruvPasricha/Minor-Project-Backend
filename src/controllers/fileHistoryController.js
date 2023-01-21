import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import QUERY from '../models/fileHistoryModel.js';
import HTTP_STATUS_CODES from '../domain/statusCodes.js';

export const dispatchFile = (request, response) => {
    console.log(request.method + ' ' + request.originalUrl + ' Transferring File');
    database.query(QUERY.DISPATCH_FILE, Object.values(request.body), (error, results) => {
        console.log(error, results);
        let code, status, message, data;
        if (results) {
            code = HTTP_STATUS_CODES.OK.code;
            status = HTTP_STATUS_CODES.OK.status;
            message = 'File Transferred';
        } else {
            code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.code;
            status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.status;
            message = 'Internal Server Error';
        }
        response.status(code).send(new Response(code, status, message, data));
    });
};

export const closeFile = (request, response) => {
    console.log(request.method + ' ' + request.originalUrl + ' Closing File');
    database.query(QUERY.CLOSE_FILE, Object.values(request.body), (error, results) => {
        console.log(error, results);
        let code, status, message;
        if (results) {
            code = HTTP_STATUS_CODES.OK.code;
            status = HTTP_STATUS_CODES.OK.status;
            message = 'Closed File';
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
        }
        response.status(code).send(new Response(code, status, message));
    });
};

export const receiveFile = (request, response) => {
    console.log(request.method + ' ' + request.originalUrl + ' Receiving File');
    database.query(QUERY.RECEIVE_FILE, Object.values(request.body), (error, results) => {
        console.log(error, results);
        let code, status, message;
        if (results) {
            code = HTTP_STATUS_CODES.OK.code;
            status = HTTP_STATUS_CODES.OK.status;
            message = 'File Received';
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
        }
        response.status(code).send(new Response(code, status, message));
    });
};
