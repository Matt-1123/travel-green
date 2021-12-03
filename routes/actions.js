const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const Action = require("../models/Action");

// @route     GET api/actions
// @desc      Get all users actions
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const actions = await Action.find({ user: req.user.id }).sort({ date: -1 });
    res.json(actions);
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
      check("title", "Title is required").not().isEmpty(),
      check("impact", "A number for kg CO2 prevented is required")
        .not()
        .isEmpty(),
      check("travelTypeUsed", "Travel type used is required").not().isEmpty(),
      check("travelTypeAvoided", "Travel type avoided is required")
        .not()
        .isEmpty(),
      check("actionType", "Action type is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      actionType,
      date,
      title,
      impact,
      travelTypeUsed,
      travelTypeAvoided,
    } = req.body;

    try {
      const newAction = new Action({
        actionType,
        date,
        title,
        impact,
        travelTypeUsed,
        travelTypeAvoided,
        user: req.user.id,
      });

      const action = await newAction.save();

      res.json(action);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route     PUT api/actions/:id
// @desc      Update action
// @access    Private
router.put("/:id", (req, res) => {
  res.send("Update an action");
});

// @route     DELETE api/actions/:id
// @desc      Delete action
// @access    Private
router.delete("/:id", (req, res) => {
  res.send("Delete action");
});

module.exports = router;
