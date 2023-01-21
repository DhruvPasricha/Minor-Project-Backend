class HTTPStatusCode {
    constructor(code, status) {
        this.code = code;
        this.status = status;
    }
}

const HTTP_STATUS_CODES = {
    OK: new HTTPStatusCode(200, 'OK'),
    NO_CONTENT: new HTTPStatusCode(204, 'NO_CONTENT'),
    BAD_REQUEST: new HTTPStatusCode(400, 'BAD_REQUEST'),
    NOT_FOUND: new HTTPStatusCode(404, 'NOT_FOUND'),
    INTERNAL_SERVER_ERROR: new HTTPStatusCode(500, 'INTERNAL_SERVER_ERROR'),
};

export default HTTP_STATUS_CODES;
