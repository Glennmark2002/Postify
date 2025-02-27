import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import { middleware } from './utils/error.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(cors({origin : ['https://postify-amber-eta.vercel.app']}));

app.listen(3000, () => console.log('Running on http://localhost:3000')); 
mongoose.connect(process.env.MONGO);

app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use(middleware);





