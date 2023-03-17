const express = require('express')

const {login, register, logout, displayAllUsers, getFilteredUsers, updateUserphone, writeReview} = require("../controllers/auth")
const router = express.Router();

router.post("/writereview", writeReview);
router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/displayallusers", displayAllUsers);
router.get("/getfilteredusers", getFilteredUsers);
router.post("/updateuserphone", updateUserphone);

module.exports = router;