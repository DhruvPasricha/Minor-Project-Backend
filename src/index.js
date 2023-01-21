import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.listen(PORT, () => {
    console.log('server is running on ' + ip.address() + ':' + PORT);
});
