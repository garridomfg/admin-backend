/* 
    Route: /api/uploads
*/

const { Router } = require("express");
const expressFileUpload = require("express-fileupload");
const { validateJWT } = require("../middlewares/validate-jwt");
const { fileUpload, getImg } = require("../controllers/upload.controller");

const router = Router();

router.use(expressFileUpload());
router.put("/:collection/:id", validateJWT, fileUpload);
router.get("/:collection/:img", getImg);

module.exports = router;
