const mongoose = require("mongoose");

const postulateSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  amount:{
    type: Number,
  },
  credit: {
      type: String,
  },
  id_freelancer : {
    type: String,
}
  })

module.exports = mongoose.model("Jobs", jobsSchema);