const { response } = require("express");
const Hospital = require("../models/hospital.model");
const User = require("../models/user.model")

const getHospitals = async (req, res = response) => {
  const hospitals = await Hospital.find().populate("user", "name img");
  try {
    res.json({
      ok: true,
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

const getHospitalById = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "getHospitalById",
  });
};

const createHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({ user: uid, ...req.body });
  const userDB = await User.findById(uid)
  const hospitalByName = await Hospital.findOne({name: hospital.name})

  if(hospitalByName) {
    res.status(500).json({
      ok: false,
      msg: "The hospital is already registered",
    });
  }

  if(!userDB || !userDB.active) {
    res.status(500).json({
      ok: false,
      msg: "The user do not exist in the DB",
    });
  }

  try {
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospitals: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

const updateHospital = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "updateHospital",
  });
};

const deleteHospital = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "deleteHospital",
  });
};

module.exports = {
  createHospital,
  deleteHospital,
  getHospitalById,
  getHospitals,
  updateHospital,
};
