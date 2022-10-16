import express from "express";
const jwt = require('jsonwebtoken');
import { User } from "../model/userModel";
import { CustomRequest } from "../Types/CustomRequest";

export const protect = async (
  req: CustomRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { authorization } = req.headers;
    
    let token;

    if (authorization && authorization.startsWith('Bearer')) {

      token = authorization.split(' ')[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      let user = await User.findById(decoded.id).select('-password'); // to get rid of password . only id

      if (!user) {
        throw new Error('user not found');
      }

      req.user = { userID: user._id, name: user.name };

      next();
    } else {
      throw new Error('not authorized')
    }

    if (!token) {
      throw new Error('not authorized, no token')
    }
  }catch (err) {
    console.log(err);
    res.status(401).json({ error: err.message });
  }
}
