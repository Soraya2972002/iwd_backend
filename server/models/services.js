const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

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
    type : Number,
  },
  longtitude : {
    type : Number,
  },
  MoneyOffer: {
      type: Number,
  },
  Duration: {
    type: String,
  },
  KeyWords: {
    type: [String],
  },
  id_client :{
    type : String
  },
  list_form_postulate : {
    type : [String]
  },
  isActive : {
    type : Boolean,
    default: true
  },
  set_as_finished_client : {
    type : Boolean,
    default: false
  },
  set_as_finished_freelancer : {
    type : Boolean,
    default: false
  }
  })

module.exports = mongoose.model("Services", serviceSchema);