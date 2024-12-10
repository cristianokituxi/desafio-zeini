import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import UserRoutes from './routes/userRoutes';
import doctorRoutes from './routes/doctorRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors())
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use('/usuario', UserRoutes);
app.use('/doctor', doctorRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
