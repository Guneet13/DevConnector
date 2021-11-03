const express = require('express');// create instance
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken'); // generate token
const bcrypt = require('bcryptjs'); // encryption library
const router = express.Router(); // only routing instance of the class
const User = require('../../models/User');
const Keys = require('../../config/keys');

//@route POST /api/users/register
//@desc Register a user
//@access public
router.get('/register', (req,res) => {
  User.findOne({email: req.body.email})
        .then(user => {
          if(user){
            return res.status(400).json({email: 'Email already exist!'});
          }else{
            const avatar = gravatar.url(req.body.email,{ 
                s:'200',
                r: 'pg',
                d: 'mm'
              });
            const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
              avatar // desconstruction key:value 
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

// @route POST /api/users/login
// @desc Login a user
// @access Public
router.post('/login', (req, res) => {
  User.findOne({email: req.body.email})
  .then(user => {
    //check if user exists
    if(!user){ // if user not found
      return res.status(400).json({email: 'User not found!'})
    }
    //check the password
    bcrypt.compare(req.body.password, user.password)
      .then(isMatch => {
        if(!isMatch){
          return res.status(400).json({password: 'Password incorrect'});
        }else{
          //generate token
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          };
          jwt.sign(
            payload , 
            keys.secretOrKey,
            {expiresIn: 3600},//3600seconds is 1 hour
            (err, token) => {
              return res.json({token: 'Bearer'+token})
            });
        }
      })
  })
})

module.exports = router;