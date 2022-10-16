import { Request } from 'express';
import mongoose from 'mongoose';

interface User {
  userID?: mongoose.Types.ObjectId;
  name: string;
}

export interface CustomRequest extends Request {
  user?: User;
}