const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const TravelAction = require("../models/TravelAction");

// @route     GET api/actions
// @desc      Get all user's actions
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const actions = await TravelAction.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(actions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/actions/:id
// @desc      Get action by id
// @access    Private
router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;

  try {
    let action = await TravelAction.findById(id);
    if (!action) return res.status(404).json({ msg: "Action not found" });

    res.json(action);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/actions
// @desc      Add new action
// @access    Private
router.post(
  "/",
  [
    auth,
    [
      check(
        "carbonPrevented",
        "A carbon prevented calculation result is required"
      ).isNumeric(),
      check("title", "Title is required").not().isEmpty(),
      // check("date", "A date is required").isDate(),
      check("date", "A date is required").not().isEmpty(),
      check("usedTravelType", "Used travel type is required").not().isEmpty(),
      check("usedDistance", "Used distance is required").isNumeric(),
      check("avoidedTravelType", "Avoided travel type is required")
        .not()
        .isEmpty(),
      check("avoidedDistance", "Avoided distance is required").isNumeric(),
    ],
  ],
  async (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      description,
      date,
      usedTravelType,
      usedDistance,
      avoidedTravelType,
      avoidedDistance,
      carbonPrevented,
    } = req.body;

    try {
      const newAction = new TravelAction({
        username: req.user.username,
        title,
        description,
        date,
        usedTravelType,
        usedDistance,
        avoidedTravelType,
        avoidedDistance,
        carbonPrevented,
        user: req.user.id,
      });

      const action = await newAction.save();

      res.json(action);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     PUT api/actions/:id
// @desc      Update action
// @access    Private
router.put("/:id", auth, async (req, res) => {
  const { title, description, date } = req.body;

  // Build travel action object
  const actionFields = {};
  if (title) actionFields.title = title;
  if (description) actionFields.description = description;
  if (date) actionFields.date = date;

  try {
    let action = await TravelAction.findById(req.params.id);

    if (!action) return res.status(404).json({ msg: "Action not found" });

    // Make sure user owns action
    if (action.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    action = await TravelAction.findByIdAndUpdate(
      req.params.id,
      { $set: actionFields },
      { new: true }
    );

    res.json(action);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/actions/:id
// @desc      Delete action
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let action = await TravelAction.findById(req.params.id);

    if (!action) return res.status(404).json({ msg: "Action not found" });

    // Make sure user owns action
    if (action.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await TravelAction.findByIdAndRemove(req.params.id);

    res.json({ msg: "Action deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
