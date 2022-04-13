const { getResRap, addResRap, getResRapByShort, updateResRap, deleteResRap } = require("../controllers/respapidControllers")

const router = require("express").Router();

router.post("/getresrap", getResRap);
router.post("/getresrapbyshort", getResRapByShort);
router.post("/addresrap", addResRap);
router.post("/updateresrap", updateResRap)
router.post("/deleteresrap", deleteResRap)

module.exports = router;