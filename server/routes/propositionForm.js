const express = require('express')

const {addpropositionForm, getFilteredPropositionForms} = require("../controllers/propositionForm")
const router = express.Router();


router.post("/addpropositionForm", addpropositionForm);
router.get("/getFilteredPropositionForms", getFilteredPropositionForms);
module.exports = router;