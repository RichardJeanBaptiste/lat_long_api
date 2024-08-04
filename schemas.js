const mongoose = require('mongoose');

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


module.exports = { userSchema };