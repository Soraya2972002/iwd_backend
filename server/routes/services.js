const express = require('express')

const { getAllServices, getFilteredServices, addService, getAllServicesOfOneClient, set_as_finished_client_true,set_as_finished_freelancer_true, displayPostulate, serviceIsOutdated, refuseFreelancer, acceptFreelancer } = require("../controllers/services")
const router = express.Router();

router.get("/getallservices", getAllServices);
router.get("/getfilteredservices", getFilteredServices);
router.post("/addservice", addService);
router.post("/getallservicesofoneclient", getAllServicesOfOneClient);
router.post("/setasfinishedclienttrue", set_as_finished_client_true);
router.post("/setasfinishedfreelancertrue", set_as_finished_freelancer_true);
router.post("/displaypostulate", displayPostulate);
router.post("/serviceisoutdated", serviceIsOutdated);
router.post("/refuseFreelancer", refuseFreelancer);
router.post("/acceptFreelancer", acceptFreelancer);

module.exports = router;