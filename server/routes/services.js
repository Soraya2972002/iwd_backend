const express = require('express')

const { getAllServices, getFilteredServices, addService, getAllServicesOfOneClient, set_as_finished_client_true,set_as_finished_freelancer_true } = require("../controllers/services")
const router = express.Router();

router.get("/getallservices", getAllServices);
router.get("/getfilteredservices", getFilteredServices);
router.post("/addservice", addService);
router.post("/getallservicesofoneclient", getAllServicesOfOneClient);
router.post("/setasfinishedclienttrue", set_as_finished_client_true);
router.post("/setasfinishedfreelancertrue", set_as_finished_freelancer_true);

module.exports = router;