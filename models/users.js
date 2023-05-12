const fs = require("node:fs/promises");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");
const filePath = path.resolve(process.cwd(), "data", "users.json");

async function getUsers() {}

async function getUserByID(id) {}

async function createUser(newUser) {}

async function updateUserByID(id, updatedUser) {}

async function deleteUserByID(id) {}

module.exports = {
  getUsers,
  getUserByID,
  createUser,
  updateUserByID,
  deleteUserByID,
};
