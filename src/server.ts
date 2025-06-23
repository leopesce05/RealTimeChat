import express from 'express';
import router from './router';
import dotenv from 'dotenv';
import connectDB from './config/db';
import morgan from 'morgan';
import colors from 'colors';

// Configurar variables de entorno
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Log
app.use(morgan('dev'));

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes
app.use(router);

export default app;