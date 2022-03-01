const express = require("express");
const router = express.Router();
const axios = require("axios");
const cors = require("cors");

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

// @route     GET api/carbon-interface/models/:makeid
// @desc      Get vehicle models of vehicle make
// @access    Public
router.get("/models/:makeid", async (req, res) => {
  const makeId = req.params.makeid;

  res.set({
    "Access-Control-Allow-Origin": "*",
  });

  try {
    const response = await axios.get(
      `https://www.carboninterface.com/api/v1/vehicle_makes/${makeId}/vehicle_models`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_CARBON_INTERFACE_BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res.get("Access-Control-Allow-Origin"));
    console.log(response.data);
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err);
  }
});

// @route     GET api/carbon-interface/carbon/:distance/:modelId
// @desc      Get vehicle models of vehicle make
// @access    Public
router.get("/carbon/:distance/:modelId", async (req, res) => {
  const distance = req.params.distance;
  const modelId = req.params.modelId;
  console.log(`distance: ${distance}, modelId: ${modelId}`);

  try {
    const tripData = {
      type: "vehicle",
      distance_unit: "mi",
      distance_value: distance,
      vehicle_model_id: modelId,
    };

    const response = await axios.post(
      "https://www.carboninterface.com/api/v1/estimates",
      tripData,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_CARBON_INTERFACE_BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data.data.attributes.carbon_kg;
    if (data) return res.json(data);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err);
  }
});

module.exports = router;
