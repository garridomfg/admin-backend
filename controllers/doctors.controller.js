const { response } = require("express");

const getDoctors = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "getDoctors",
  });
};

const getDoctorById = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "getDoctorById",
  });
};

const createDoctor = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "createDoctor",
  });
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
