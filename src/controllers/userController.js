import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import QUERY from '../models/userModel.js';
import HTTP_STATUS_CODES from '../domain/statusCodes.js';

export const createUser = (request, response) => {
    console.log(request.method + ' ' + request.originalUrl + ' Creating User');
    database.query(QUERY.CREATE_USER, Object.values(request.body), (error, results) => {
        console.log(error, results);
        let code, status, message, data;
        if (results) {
            code = HTTP_STATUS_CODES.OK.code;
            status = HTTP_STATUS_CODES.OK.status;
            message = 'User created';
        } else {
            code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.code;
            status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.status;
            message = 'Internal Server Error';
        }
        response.status(code).send(new Response(code, status, message, data));
    });
};

export const getUser = (request, response) => {
    console.log(request.method + ' ' + request.originalUrl + ' Getting User');
    database.query(QUERY.GET_USER_INFO_FROM_USER_ID, [request.params.id], (error, results) => {
        console.log(error, results);
        let code, status, message, data;
        if (results && results[0]) {
            code = HTTP_STATUS_CODES.OK.code;
            status = HTTP_STATUS_CODES.OK.status;
            message = 'Fetched User';
            data = {
                user: results[0],
            };
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
        response.status(code).send(new Response(code, status, message, data));
    });
};
