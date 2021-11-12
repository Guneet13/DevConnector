const express = require('express');// create instance
const router = express.Router(); // only routing instance of the class
const passport = require("passport");
// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");


// @route GET /api/profile/register
// @desc Register a user
// @access Public
router.get('/register', (req,res) => res.json({msg: 'profile work!'}));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;