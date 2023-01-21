import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import QUERY from '../models/fileModel.js';
import FILE_HISTORY_QUERY from '../models/fileHistoryModel.js';
import HTTP_STATUS_CODES from '../domain/statusCodes.js';

export const createFile = (request, response) => {
    let code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.code,
        status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.status,
        message;
    console.log(request.method + ' ' + request.originalUrl + ' Creating File');
    const { subject, createdBy } = request.body;
    database.query(QUERY.CREATE_FILE, [subject, createdBy], (error, results) => {
        console.log(error, results);
        if (error) {
            response.status(code).send(new Response(code, status, message));
            return;
        }
        database.query(FILE_HISTORY_QUERY.CREATE_FILE, [createdBy, createdBy], (error, results) => {
            console.log(error, results);
            if (!error) {
                code = HTTP_STATUS_CODES.OK.code;
                status = HTTP_STATUS_CODES.OK.status;
                message = 'File Created';
            }
            response.status(code).send(new Response(code, status, message));
        });
    });
};

export const getFile = (request, response) => {
    console.log(request.method + ' ' + request.originalUrl + ' Getting File');
    database.query(QUERY.GET_FILE, [request.params.id], (error, results) => {
        console.log(error, results);
        let code, status, message, data;
        if (results && results[0]) {
            code = HTTP_STATUS_CODES.OK.code;
            status = HTTP_STATUS_CODES.OK.status;
            message = 'Fetched File';
            data = {
                file: results[0],
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
};

export const getUserFiles = (request, response) => {
    console.log(request.method + ' ' + request.originalUrl + ' Getting File');
    const queries = `
        ${QUERY.GET_FILES_CREATED_BY_USER};
        ${QUERY.GET_FILES_CURRENTLY_WITH_USER};
        ${QUERY.GET_FILES_SENT_BY_USER};
        ${QUERY.GET_INCOMING_FILES_FOR_USER};
    `;
    const userID = request.params.id;
    database.query(queries, [userID, userID, userID, userID], (error, results) => {
        console.log(error, results);
        let code, status, message, data;
        if (results && results[0]) {
            code = HTTP_STATUS_CODES.OK.code;
            status = HTTP_STATUS_CODES.OK.status;
            message = 'Fetched Files';
            data = {
                created: results[0],
                currentlyHolding: results[1],
                sent: results[2],
                incoming: results[3],
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
};
