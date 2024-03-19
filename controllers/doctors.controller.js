const { response } = require("express");
const Doctor = require("../models/doctor.model");
const User = require("../models/user.model")

const getDoctors = async (req, res = response) => {
  const doctors = await Doctor.find()
    .populate("user", "name img")
    .populate("hospital", "name img");
  try {
    res.json({
      ok: true,
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

const getDoctorById = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "getDoctorById",
  });
};

const createDoctor = async (req, res = response) => {
  const uid = req.uid;
  const doctor = new Doctor({ user: uid, ...req.body });
  const userDB = await User.findById(uid)

  if(!userDB || !userDB.active) {
    res.status(500).json({
      ok: false,
      msg: "The user do not exist in the DB",
    });
  }

  try {
    const doctorDB = await doctor.save();
    res.json({
      ok: true,
      doctor: doctorDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

const updateDoctor = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "updateDoctor",
  });
};

const deleteDoctor = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "deleteDoctor",
  });
};

module.exports = {
  createDoctor,
  deleteDoctor,
  getDoctorById,
  getDoctors,
  updateDoctor,
};
