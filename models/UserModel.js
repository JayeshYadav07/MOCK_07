const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String,
    },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = { UserModel };
