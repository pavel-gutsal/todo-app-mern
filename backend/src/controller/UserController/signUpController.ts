import express from "express";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import mongoose from "mongoose";
import { User } from "../../model/userModel";

// @desc  signUp users
// @route POST /user/signup
// @access Public
export const signup = async (req: express.Request, res: express.Response) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      throw new Error('Please fill all required fields');
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      throw new Error('User already exists')
    }

    if (password.length < 8) {
      throw new Error('Password is too short')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    if (user) {
      console.log({
        token: generateToken(user._id),
        name: user.name,
      })

      res.status(201).json({
        token: generateToken(user._id),
        name: user.name,
      })
    } else {
      throw new Error('Invalid registration')
    }

  } catch(error) {
    return res.status(400).json({error: error.message});
  }
};

const generateToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '2d'});
}