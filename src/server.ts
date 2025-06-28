import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import connectDB from './config/db';
import {corsOptions} from './config/cors';
import router from './router';

// Configurar variables de entorno
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Log
app.use(morgan('dev'));

// Middleware for parsing JSON bodies
app.use(express.json());

// CORS
app.use(cors(corsOptions));

// Routes
app.use(router);

export default app;