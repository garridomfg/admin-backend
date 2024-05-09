/* 
    Route: /api/hospitals
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  createHospital,
  deleteHospital,
  getHospitalById,
  getHospitals,
  updateHospital,
} = require("../controllers/hospitals.controller");

const router = Router();

router.get("/", [], getHospitals);

router.get("/:id", [], getHospitalById);

router.post(
  "/",
  [
    validateJWT,
    check("name", "Hospital name required").not().isEmpty(),
    validateFields,
  ],
  createHospital
);

router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Hospital name required").not().isEmpty(),
    validateFields,
  ],
  updateHospital
);

router.delete("/:id", [validateJWT], deleteHospital);

module.exports = router;
