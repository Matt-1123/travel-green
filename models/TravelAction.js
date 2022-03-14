const mongoose = require("mongoose");

// Note: Schema maps to the actions MongoDB collection and defines the shape of the documents within that collection.
const TravelActionSchema = mongoose.Schema({
  username: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // refer to the 'users' collection
  },
  title: { type: String, required: true },
  description: String,
  date: { type: Date, default: Date.now },
  usedTravelType: { type: String, required: true },
  usedDistance: { type: Number, required: true },
  avoidedTravelType: { type: String, required: true },
  avoidedDistance: { type: String, required: true },
  carbonPrevented: { type: Number, required: true },
});

module.exports = mongoose.model("travel-action", TravelActionSchema);
