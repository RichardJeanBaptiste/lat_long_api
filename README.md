# lat_long_api

## This API accepts latitude and longitude as input parameters and returns a sorted list of users within a 10-kilometer radius


## Installation

To run this application locally

- Required Downloads
    - NodeJS @ v20.16.0
    - MongoDB - if running locally with Atlas

- Clone this repo onto your computer
- run npm install
- Setup MongoDB
    - This project uses MongoDB atlas as the database for the project to setup an atlas account follow this guide : https://www.mongodb.com/resources/products/platform/mongodb-atlas-tutorial#create-a-mongodb-cloud-account
    - Then create a .env file at the root of the project and add the line : MONGO_URI = "Your Connection String";
    - Optionally to setup Mongo Shell :
        - Follow these installation instructions : https://www.mongodb.com/docs/manual/administration/install-community/
        - Setup Mongo Shell : https://www.mongodb.com/docs/v4.4/mongo/
        - Then create a .env file at the root of the project and add the line : MONGO_URI = "Replace With Local Connection String";
- Finally run "node index.js" and if everything was installed correctely you should see the message : App listening on port 3000

## Routes

### POST /add_user : add user to database 
    - {user: String, lat: Number | String, long: Number | String}
    - Accepted latitude and longitude format are of the form : "57.6782" / "-34.0522° N"

### POST /find_users : find users within 10km of given coordinates
    - {lat: Number | String, long: Number | String}
    - Accepted latitude and longitude format are of the form : "57.6782" / "-34.0522° N"
    - return format:
        - [
            {
              user: "1",
              lat: "57.6782",
              long: "57.6782",
              distance: 1.2,
            },
            {
              user: "2",
              lat: "57.6782",
              long: "57.6782",
              distance: 2.2,
            },
            {
              user: "3",
              lat: "57.6782",
              long: "57.6782",
              distance: 6.2,
            },
          ]





