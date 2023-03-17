const mongoose = require("mongoose");

const propositionSchema = new mongoose.Schema({
  propositionText: {
    type: String,
  },
  bids: {
    type: Number,
    min: 5,
  },
  report: {
    type: String,
  },
});

module.exports = mongoose.model("PropositionForm", propositionSchema);