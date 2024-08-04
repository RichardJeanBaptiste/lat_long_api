const express = require('express')

const port = 3000;
require('dotenv').config();
const mongoose = require('mongoose');
//const userSchema = require('./schemas');
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

    try {

        const userSchema = new mongoose.Schema({
            user: {
                type: String,
            },
            lat: {
                type: String,
            },
            long: {
                type: String
            }
        });

        const User = mongoose.models.User || mongoose.model('User', userSchema);

        await mongoose.connect(mongo_uri,{
            dbName: 'Users',
        })
    
        console.log(req.body);
    
        let newUser = new User({
            user: req.body.user,
            lat: req.body.lat,
            long: req.body.long,
        })
    
        await newUser.save();
        
        res.send("User Added");
        
    } catch (error) {
        console.log(error);
        res.send("Server Error :(");   
    }

    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})