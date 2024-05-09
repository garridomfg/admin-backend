const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Check email
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Invalid credentials",
      });
    }

    // Check password
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid credentials",
      });
    }

    // Generate token
    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
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

const googleSignIn = async (req, res = response) => {
  try {
    const { email, name, picture } = await googleVerify(req.body.token);

    const userDB = await User.findOne({ email });
    let user;

    if (!userDB) {
      user = new User({
        name,
        email,
        password: "@@@",
        img: picture,
        google: true,
      });
    } else {
      user = userDB;
      user.google = true;
    }

    // Save user
    await user.save();

    // Generate token - JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      email,
      name,
      picture,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Invalid Google Token",
    });
  }
};

const renewToken = async (req, res = response) => {

  const uid = req.uid;

  // Generate token - JWT
  const token = await generateJWT(uid);

  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  login,
  googleSignIn,
  renewToken,
};
