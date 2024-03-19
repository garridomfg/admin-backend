const { response } = require("express");
const User = require("../models/user.model");
const Doctor = require("../models/doctor.model");
const Hospital = require("../models/hospital.model");

const searchAll = async (req, res = response) => {
  const query = req.params.q;
  const regex = new RegExp(query, "i");

  const [users, doctors, hospitals] = await Promise.all([
    User.find({ name: regex }),
    Doctor.find({ name: regex }),
    Hospital.find({ name: regex }),
  ]);

  try {
    res.json({
      ok: true,
      users,
      doctors,
      hospitals,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

const searchByCollection = async (req, res = response) => {
  const table = req.params.table;
  const query = req.params.q;
  const regex = new RegExp(query, "i");

  let data = [];

  switch (table) {
    case "doctors":
      data = await Doctor.find({ name: regex })
        .populate("user", "name img")
        .populate("hospital", "name img");
      break;
    case "hospitals":
      data = await Hospital.find({ name: regex }).populate("user", "name img");
      break;
    case "users":
      data = await User.find({ name: regex });
      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "The table must be one of the following: doctors - hospitals - users",
      });
  }

  res.json({
    ok: true,
    results: data,
  });
};

module.exports = {
  searchAll,
  searchByCollection,
};
