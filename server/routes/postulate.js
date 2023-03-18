const express = require('express')

const {addForm, getFilteredForms} = require("../controllers/postulate")
const router = express.Router();

router.post("/addForm", addForm);
router.post("/getFilteredForms", getFilteredForms);
module.exports = router;