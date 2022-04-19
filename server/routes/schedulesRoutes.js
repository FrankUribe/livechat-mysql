const { getSchedule, getScheduleByDay, updateSchedule } = require("../controllers/scheduleControllers")

const router = require("express").Router();

router.post("/getschedule", getSchedule);
router.get("/getschedulebyday/:day", getScheduleByDay)
router.post("/updateschedule", updateSchedule);

module.exports = router;