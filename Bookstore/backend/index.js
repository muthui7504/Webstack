import express from 'express';
import mongoose from 'mongoose';
import { PORT, MONGO_URI, REDIS_URI } from './config.js';
import cors from 'cors';
import BookRoute from './routes/booksRoute.js';
import { createClient } from 'redis';


const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5177',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    
})) 

app.use('/books', BookRoute);

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('Hello World');
});


mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
});

// Redis connection
const redisClient = createClient({
    url: REDIS_URI,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

redisClient.connect()
    .then(() => {
        console.log('Connected to Redis');
    })
    .catch(err => {
        console.error('Failed to connect to Redis', err);
    });