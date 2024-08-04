const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
        type: String,
    },
    lat: {
        type: Number
    },
    long: {
        type: Number
    }
});

const User = mongoose.models.User || mongoose.model("User", userSchema, "users");

module.exports = { User };