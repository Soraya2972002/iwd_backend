const express = require('express')

const {getAllServices, getFilteredServices, addService} = require("../controllers/services")
const router = express.Router();

router.get("/getallservices", getAllServices);
router.get("/getfilteredservices", getFilteredServices);
router.post("/addservice", addService);
module.exports = router;