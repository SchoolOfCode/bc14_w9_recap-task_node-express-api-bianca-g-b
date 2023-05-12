const express = require("express");
const userRouter = express.Router();

const {
  getUsers,
  getUserByID,
  createUser,
  updateUserByID,
  deleteUserByID,
} = require("../models/users.js");

module.exports = userRouter;
