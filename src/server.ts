import express from 'express';
import router from './router';
import dotenv from 'dotenv';
import connectDB from './config/db';

// Configurar variables de entorno
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes
app.use(router);

export default app;