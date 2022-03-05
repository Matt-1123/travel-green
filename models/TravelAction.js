const mongoose = require("mongoose");

// Note: Schema maps to the actions MongoDB collection and defines the shape of the documents within that collection.
const TravelActionSchema = mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "users", // refers to the specific collection in the db
  // },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  usedTravelMode: { type: String, required: true },
  usedDistance: { type: Number, required: true },
  avoidedTravelMode: { type: String, required: true },
  avoidedDistance: { type: String, required: true },
  avoidedVehicle: { type: String, required: true },
  carbonPrevented: { type: Number, required: true },
});

module.exports = mongoose.model("travel-action", TravelActionSchema);
