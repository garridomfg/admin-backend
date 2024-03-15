const { response } = require("express");

const getHospitals = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "getHospitals",
  });
};

const getHospitalById = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "getHospitalById",
  });
};

const createHospital = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "createHospital",
  });
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
