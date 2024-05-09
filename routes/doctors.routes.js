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

router.post(
  "/",
  [
    validateJWT,
    check("name", "Doctor name required").not().isEmpty(),
    check("hospital", "Must be a valid ID").isMongoId(),
    validateFields,
  ],
  createDoctor
);

router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Doctor name required").not().isEmpty(),
    check("hospital", "Must be a valid ID").isMongoId(),
    validateFields,
  ],
  updateDoctor
);

router.delete("/:id", validateJWT, deleteDoctor);

module.exports = router;
