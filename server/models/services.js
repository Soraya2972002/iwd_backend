const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  coverImages: {
    type: String,
    required: [true, "Please provide an image"]
  },
  title:{
    type: String,
    required: [true, "Please provide a title"]
  },
  ServiceDescription: {
      type: String,
      required: [true, "Please provide a description"]
  },
  latitude : {
    type : String,
  },
  longtitude : {
    type : String,
  },
  MoneyOffer: {
      type: String,
  },
  Duration: {
    type: String,
  },
  KeyWords: {
    type: String,
  }
  })

module.exports = mongoose.model("Services", serviceSchema);