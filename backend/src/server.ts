// to use environment variables
require('dotenv').config();

import express from 'express';
import { connectDB } from './config/db'
import {router as todoRoutes} from './routes/todoRoutes';
import {router as userRoutes} from './routes/userRoutes';
const cors = require("cors");

// initiating express app
const app = express();
const port = process.env.PORT || 8000;
connectDB();

app.use(express.json());
app.use(cors());

app.use('/todos', todoRoutes);
app.use('/user', userRoutes);

app.use('/', (req, res) => {
  return res.status(200).json({message: 'wrong route'});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
