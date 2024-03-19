/* 
    Route: /api/all
*/

const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const { searchAll, searchByCollection } = require("../controllers/search.controller");

const router = Router();

router.get("/:q", validateJWT, searchAll);
router.get("/collection/:table/:q", validateJWT, searchByCollection);

module.exports = router;
