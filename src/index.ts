import express, { Request, Response, json } from 'express';
import { connectToDB } from './db';

// dotenv import & use
import 'dotenv/config';

const app = express();

// use 4000 port, in the absence of env variable
const port = process.env.PORT || 4000;

// middlewares
app.use(json());

// connection to Mongo DB
connectToDB();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});