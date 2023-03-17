const express = require('express')

const {getAllJobs, getFilteredJobs, addJob} = require("../controllers/jobs")
const router = express.Router();

router.get("/getalljobs", getAllJobs);
router.get("/getfilteredjobs", getFilteredJobs);
router.post("/addjob", addJob);
module.exports = router;