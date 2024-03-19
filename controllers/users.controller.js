const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");
const { generateJWT } = require("../helpers/jwt");

const getUsers = async (req, res = response) => {
  const from = Number(req.query.from) || 0;
  const to = Number(req.query.to) || 20;

  const [users, total] = await Promise.all([
    User.find().skip(from).limit(to),
    User.countDocuments()
  ]);

  try {
    res.json({
      ok: true,
      users,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

const getUserById = async (req, res = response) => {
  const uid = req.params.id;
  const user = await User.findById(uid);

  try {
    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "The user email is already registered",
      });
    }

    const user = new User(req.body);

    // Hide password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Save user in DB
    await user.save();

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

const updateUser = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "No user has been found",
      });
    }

    // Updates
    const { password, google, email, ...fields } = req.body;

    if (userDB.email !== email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          ok: false,
          msg: "The email is already registered",
        });
      }
    }
    fields.email = email;
    const updatedUser = await User.findByIdAndUpdate(uid, fields, {
      new: true,
    });

    res.json({
      ok: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

const deleteUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const userDB = await User.findById(uid);
    if (!userDB || !userDB.active) {
      return res.status(404).json({
        ok: false,
        msg: "No user has been found",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      uid,
      { active: false },
      {
        new: true,
      }
    );

    res.json({
      ok: true,
      user: updatedUser,
      msg: "User deleted correctly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

module.exports = {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
};
