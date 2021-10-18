const express = require('express');// create instance
const router = express.Router(); // only routing instance of the class

//@route POST /api/users/register
//@desc Register a user
//@access Public
router.get('/test', (req,res) => res.join({msg: 'posts work!'}));

module.exports = router;