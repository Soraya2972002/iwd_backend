const express = require('express')

const {addForm, getFilteredForms} = require("../controllers/postulate")
const router = express.Router();

router.get("/addForm", addForm);
router.get("/getFilteredForms", getFilteredForms);
module.exports = router;