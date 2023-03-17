const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: String,
  author: String, //the id of the author, so we can get the profile picture and other stuff
  date: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    max: 50,
  },
  phone_number : {
    type : Number,
    max: 9999999999,
    min : 10,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    min: 8,
  },
  picture: {
    type: String,
  },
  latitude : {
    type : String,
  },
  longtitude : {
    type : String,
  },
  bio : {
    type : String,
  },
  services : {
    type : String,
  },
  interestedTheme : {
    type: [String],
    enum: ["topic 1", "topic 2", "topic 3", "topic 3", "topic 4", "Other"]
  },
  skills : {
    type : [String],
    enum: ["skill 1", "skill 2", "skill 3", "skill 3", "skill 4", "Other"]
  },
  reviews: {
    type : [commentSchema]  
  },

});

module.exports = mongoose.model("Users", userSchema);