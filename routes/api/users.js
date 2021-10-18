const express = require('express');// create instance
const bcrypt = require('bcryptjs'); // encryption library
const router = express.Router(); // only routing instance of the class
const User = require('../../models/User');


//@route POST /api/users/register
//@desc Register a user
//@access public
router.get('/register', (req,res) => {
  User.findOne({email: req.body.email})
        .then(user => {
          if(user){
            return res.status(400).json({email: 'Email already exist!'});
          }else{
            const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password
            });// enter row data

            //encrypt password
            bcrypt.genSalt(10, (err, salt)=> {
              if(err) throw err; // if salt not created
              bcrypt.hash(req.body.password, salt, (err,hash)=> {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));// save it to db
              });// if salt created successfully, do this
            });// callback way
          }
        })
        .catch(err => console.log(err));// previous cmd executed successfully or failed without issues
});

module.exports = router;