/* 
    Route: /api/auth
*/
const { Router } = require("express");
const { login } = require("../controllers/auth.controller");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.post(
  "/",
  [
    check("email", "Email required").isEmail(),
    check("password", "Password required").not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = router;
