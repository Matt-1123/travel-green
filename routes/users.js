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
    check("name", "Name is required").not().isEmpty(),
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

    const { name, email, password } = req.body;

    try {
      // Check if there is a user with the email passed in.
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({ msg: "User already exists." });
      }

      // use User model to create a new user instance
      user = new User({
        name,
        email,
        password,
      });

      // Returns a salt as a promise. A salt is a random string. By hashing a plain text password plus a salt, the hash algorithm's output is no longer predictable.
      const salt = await bcrypt.genSalt(10);

      // Hash password with plain text password and salt. Returns a promise. Assign the result to the user model to replace original plain text password.
      user.password = await bcrypt.hash(password, salt);

      // Save user to database.
      await user.save();

      // payload is the object we'll send in the token
      // We only need to send in the user ID because that's all that is needed to access user info.
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Generate a token by signing it. Respond with the token in the response.
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
