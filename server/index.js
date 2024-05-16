import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserRouter } from './routes/user.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// Configure CORS middleware with the appropriate options
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));

// Route for handling user-related requests
app.use('/auth', UserRouter);

mongoose
  .connect('mongodb://localhost:27017/authentication')
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.error("DB Connection Error:", err.message);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
