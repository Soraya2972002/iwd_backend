const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: String,
  author: String, //the id of the author, so we can get the profile picture and other stuff
  date: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, "Please provide a username"],
    min: 3,
    max: 20,
  },
  prenom: {
    type: String,
    required: [true, "Please provide a username"],
    min: 3,
    max: 20,
  },
  baridimob : {
    type: Number,
    required: [true, "Please provide your account number"],
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
    min : 1111111111,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    min: 8,
  },
  profile_picture: {
    type: String,
  },
  identity_picture : {
    type: String,
    required: [true, "Please provide your identity picture, for safety measures"],
  },
  latitude : {
    type : Number,
  },
  longtitude : {
    type : Number,
  },
  bio : {
    type : String,
  },
  services : {
    type : [String],
    enum: ["skill 1", "skill 2", "skill 3", "skill 3", "skill 4", "Other"]
  },
  interestedTheme : {
    type: [String],
    enum: ["topic 1", "topic 2", "topic 3", "topic 3", "topic 4"]
  },
  interestedThemeOther : {
    type : [String],
  },
  reviews: {
    type : [commentSchema]  
  },
  bids : {
    type : Number,
    default : 100
  }

});

userSchema.virtual('location').get(function() {
  return [this.longitude, this.latitude];
});

User = mongoose.model("Users", userSchema);
Comment = mongoose.model("Comment", commentSchema);
module.exports = {User, Comment}