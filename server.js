const express = require('express');//imported express library
const mongoose = require('mongoose');
const passport  = require('passport');
const db = require('./config/keys');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const app = express();// instance of express

//body parser config
app.use(express.urlencoded);
app.use(express.json());

//Passport configuration
app.use(passport.initialize());
//lets write our first route
app.get('/', (req,res) => res.send('Hello Server'));// anonymous function

//use route
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// connect to db
mongoose.connect(db.mongoURI)
        .then(() => console.log('mongodb is connected'))//called on success
        .catch((err)=> console.log(err));// called on failure

const port = 5000;
app.listen(port, ()=> console.log(`server is running on port${port}`));// callback secondary thread in multi threading



