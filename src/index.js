import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';
import Response from './domain/response.js';
import HTTP_STATUS_CODES from './domain/statusCodes.js';

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/', (_request, respone) => {
    respone.send(new Response(HTTP_STATUS_CODES.OK.code, HTTP_STATUS_CODES.OK.status, 'File.io API'));
});
app.listen(PORT, () => {
    console.log('server is running on ' + ip.address() + ':' + PORT);
});
