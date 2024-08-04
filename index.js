const express = require('express')

const port = 3000;
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./schemas');
var bodyParser = require('body-parser')

let mongo_uri = process.env.MONGO_URI;

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Find users within proximity
app.get('/find_users', (req, res) => {

});

/** ADD User w/ Lat & Long */
app.post('/add_user', async(req, res) => {

    await mongoose.connect(mongo_uri,{
        dbName: 'Users',
    })
    console.log(req.body);
    return "";
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})