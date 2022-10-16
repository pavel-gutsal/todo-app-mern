import express from "express";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import mongoose from "mongoose";
import { User } from "../../model/userModel";

// @desc  login users
// @route POST /user/login
// @access Public
export const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error('fill all required fields');
    }

    const user = await User.findOne({email});

    if(!user) {
      throw new Error('user not found');
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        token: generateToken(user._id),
        name: user.name,
    })} else {
      throw new Error('wrong password or email');
    }

  }catch(err) {
    res.status(400).json({ error: err.message });
  }
};

const generateToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '2d'});
}