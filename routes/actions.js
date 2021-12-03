const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
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
router.post("/", (req, res) => {
  res.send("Post an action");
});

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
