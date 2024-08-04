const express = require('express')
const port = 3000;
require('dotenv').config();
const mongoose = require('mongoose');
//const userSchema = require('./schemas');
const {haversine, parseCoordinate, isValidCoordinate} = require('./distance');
var bodyParser = require('body-parser')
let mongo_uri = process.env.MONGO_URI;

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userSchema = new mongoose.Schema({
    user: {
      type: String,
    },
    lat: {
      type: Number, 
    },
    long: {
      type: Number, 
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point',
      },
      coordinates: {
        type: [Number],
      },
    }
  });


userSchema.pre('save', function(next) {
    this.location = {
      type: 'Point',
      coordinates: [this.long, this.lat],
    };
    next();
});

userSchema.index({ location: '2dsphere' });

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Find users within proximity
app.get('/find_users', async (req, res) => {
    try {

        await mongoose.connect(mongo_uri,{
            dbName: 'Users',
        })
    
        const earthRadiusInMeters = 6371000;
        const distanceInRadians = 10000 / earthRadiusInMeters;

        const users = await User.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[parseCoordinate(req.body.long), parseCoordinate(req.body.lat)], distanceInRadians],
                },
            },
        }).catch((error) => {
            console.log(`Mongoose search error: \n${error}`);
        });

        let usersFound = [];

        users.forEach((x) => {
            //console.log(`${x.user} -- ${x.lat} -- ${x.long}`);
            let distance = haversine(parseCoordinate(req.body.lat), parseCoordinate(req.body.long), x.lat, x.long);

            usersFound.push({
                user: x.user,
                latitude: x.lat,
                longitude: x.long,
                distance: parseFloat(distance.toFixed(2)),
            });
        })
        usersFound.sort((a, b) => a.distance - b.distance);
        res.send(usersFound);
    } catch (error) {
        console.log(`/Find_Users threw error: \n ${error}`);
        res.send("Something went wrong when finding users within the error :(");
    }
});

/** ADD User w/ Lat & Long */
app.post('/add_user', async(req, res) => {

    try {

        await mongoose.connect(mongo_uri,{
            dbName: 'Users',
        })
     

        if(parseCoordinate(req.body.lat) == false || parseCoordinate(req.body.long) == false){
            res.send("Given Coordinates are in the wrong format");
        } else {

            let newUser = new User({
                user: req.body.user,
                lat: parseCoordinate(req.body.lat),
                long: parseCoordinate(req.body.long),
            })
    
            await newUser.save();

            res.send("User Added");
        }
    
    } catch (error) {
        //console.error(`add_users threw an error: \n${error}`);

        if(error.message == "Invalid coordinate format"){
            res.send(error.message);
        } else {
            res.send("Server Error :(");  
        }
    }    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})