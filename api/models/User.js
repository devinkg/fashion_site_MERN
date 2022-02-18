const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true } // timestamps is inbuilt function in mongoDB , it automatically generates record created Datetime and updated Datetime.
);

module.exports = mongoose.model("User", UserSchema);