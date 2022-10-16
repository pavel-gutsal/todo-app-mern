import express from "express";
import { User } from "../../model/userModel";
import { CustomRequest } from "../../Types/CustomRequest";

// @desc  return user
// @route Get /user/me
// @access Public
export const getMe = async (req: CustomRequest, res: express.Response) => {
  const userID = req.user?.userID;
  const name = req.user?.name;

  if ( userID && name ) {
    res.status(200).json({ userID, name });
  } else {
    res.status(400).json({ error: "user not found" })
  }
};