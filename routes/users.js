const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// import User model
const User = require("../models/User");

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post(
  "/",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with six or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Find user by email with mongoose's findOne method
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists." });
      }

      // use User model to create a new user
      user = new User({
        username,
        email,
        password,
      });

      // Returns a salt as a promise. A salt is a random string. By hashing a plain text password plus a salt, the hash algorithm's output is no longer predictable.
      const salt = await bcrypt.genSalt(10);

      // Hash password with plain text password and salt. Returns a promise. Assign the result to the user model to replace original plain text password.
      user.password = await bcrypt.hash(password, salt);

      // Save user to database.
      await user.save();

      const payload = {
        user: {
          id: user.id,
          username: user.username,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
