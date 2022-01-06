const express = require("express");
const router = express.Router();
const axios = require("axios");

// @route     GET api/carbon-interface/makes
// @desc      Get vehicle makes
// @access    Public
router.get("/makes", async (req, res) => {
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

// @route     GET api/carbon-interface/models
// @desc      Get vehicle models
// @access    Public
router.get("/models", async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.carboninterface.com/api/v1/vehicle_makes/${make}/vehicle_models`,
      {
        headers: {
          Authorization: `Bearer ${config.CARBON_INTERFACE_BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err);
  }
});

module.exports = router;
