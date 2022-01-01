const express = require("express");
const router = express.Router();
const axios = require("axios");

// @route     GET api/carbon-interface
// @desc      Get vehicle makes
// @access    Public
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.carboninterface.com/api/v1/vehicle_makes",
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_CARBON_INTERFACE_BEARER_TOKEN}`,
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
