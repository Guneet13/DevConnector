const express = require('express');//imported express library
const app = express();// instance of express

//lets write our first route
app.get('/', (req,res) => res.send('Hello'));// anonymous function

const port = 5000;
app.listen(port, ()=> console.log(`server is running on port${port}`));// callback
