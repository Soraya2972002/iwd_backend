const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
  coverImages: {
    type: String,
    required: [true, "Please provide an image"]
  },
  title:{
    type: String,
    required: [true, "Please provide a title"]
  },
  jobDescription: {
      type: String,
      required: [true, "Please provide a description"]
  },
  MoneyOffer: {
      type: String,
  },
  Duration: {
    type: String,
  },
  DemandedSkills: {
    type: [String],
  }
  })

module.exports = mongoose.model("Jobs", jobsSchema);