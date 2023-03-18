const express = require('express')

const {getAllJobs, getFilteredJobs, addJob, jobIsOutdated} = require("../controllers/jobs")
const router = express.Router();

router.get("/getalljobs", getAllJobs);
router.get("/getfilteredjobs", getFilteredJobs);
router.post("/addjob", addJob);
router.post('/jobisoutdated', jobIsOutdated)
module.exports = router;