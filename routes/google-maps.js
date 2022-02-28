const express = require("express");
const router = express.Router();
const axios = require("axios");
const cors = require("cors");

// @route     GET api/google-maps/distance
// @desc      Get distance from origin, destination, and travel mode
// @access    Public
router.get("/distance/:origin/:destination/:mode", async (req, res) => {
  const origin = req.params.origin;
  const destination = req.params.destination;
  const mode = req.params.mode.toUpperCase();

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.data;
    if (data) return res.json(data);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err);
  }
});

module.exports = router;
