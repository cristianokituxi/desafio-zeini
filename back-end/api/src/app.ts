import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { proxyRequest } from './controller/proxyController';
import { asyncHandler } from './utils/asyncHandler';
import { authMiddleware } from './middleware/middleware';

dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());
// app.use(express.urlencoded({ extended: true }))
app.use(asyncHandler(authMiddleware));
app.use('*', asyncHandler(proxyRequest));


export default app;
