/* 
    Route: /api/doctors
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  createDoctor,
  deleteDoctor,
  getDoctorById,
  getDoctors,
  updateDoctor,
} = require("../controllers/doctors.controller");

const router = Router();

router.get("/", [], getDoctors);
router.get("/:id", [], getDoctorById);
router.post("/", [], createDoctor);
router.put("/:id", [], updateDoctor);
router.delete("/:id", [], deleteDoctor);

module.exports = router;
