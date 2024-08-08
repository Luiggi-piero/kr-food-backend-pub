import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express, { json } from 'express';
import foodRouter from './routers/food.router.js';
import userRouter from './routers/user.router.js';
import orderRouter from './routers/order.router.js';
import uploadRouter from './routers/upload.router.js';

import { dbconnect } from './config/database.config.js';
dbconnect();

const app = express();

app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: ['https://kr-food.netlify.app', 'https://kr-food1.netlify.app']
    })
);

// Rutas
app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('✅ listening on port ' + PORT);
});

// npm i jsonwebtoken
// npm i mongoose
// npm i dotenv
// npm i bcryptjs
// npm i express-async-handler

// Para la carga de imagenes a cloudinary
// npm i multer      se utiliza principalmente para cargar archivos.
// npm i cloudinary