const express = require('express')

const {addPropositionForm, getFilteredPropositionForms} = require("../controllers/propositionForm")
const router = express.Router();


router.post("/addpropositionForm", addPropositionForm);
router.get("/getFilteredPropositionForms", getFilteredPropositionForms);
module.exports = router;