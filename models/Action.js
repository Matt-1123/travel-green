const mongoose = require("mongoose");

// Note: Schema maps to the actions MongoDB collection and defines the shape of the documents within that collection.
const ActionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // refers to the specific collection in the db
  },
  actionType: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  impact: {
    type: Number,
    required: true,
  },
  travelTypeUsed: {
    type: String,
  },
  travelTypeAvoided: {
    type: String,
  },
});

module.exports = mongoose.model("action", ActionSchema);
