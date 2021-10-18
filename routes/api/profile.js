const express = require('express');// create instance
const router = express.Router(); // only routing instance of the class

router.get('/test', (req,res) => res.join({msg: 'profile work!'}));

module.exports = router;