import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors())
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/auth', authRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
