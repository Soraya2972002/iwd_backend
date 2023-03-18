const express = require('express')

const {login, register, logout, displayAllUsers, getFilteredUsers, updateUserphone, writeReview, getGlobalReview, DisplayAllReviews, ClosestPeopleToYou, getNumBids, updateBids} = require("../controllers/auth")
const router = express.Router();

router.post("/writereview", writeReview);
router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/displayallusers", displayAllUsers);
router.get("/getfilteredusers", getFilteredUsers);
router.post("/updateuserphone", updateUserphone);
router.post("/getglobalreview", getGlobalReview);
router.post("/displayallreviews", DisplayAllReviews);
router.post("/closespeopletoyou", ClosestPeopleToYou);
router.post("/getnumbids", getNumBids);
router.post("/updatebids", updateBids);

module.exports = router;