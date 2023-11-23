const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    userName:{
        type: String,
        required: [true, "the userName field is required"],
        unique: [true , "the userName is already taken"]
    },
    email:{
        type: String,
        required: [true, "the email field is required"],
        unique: [true , "the email is already taken"]
    },
    fullName:{
        type: String,
        required: [true, "the Name field is required"]
    },
    password:{
        type: String,
        required: [true, "the Password field is required"]
    },
    followers: [{
        type: String // This defines an array of strings (user names)
    }],
    post: [{
        type: String // This defines an array of strings (user names)
    }],
    profilePic: {
        type: String // This can be a URL or file path to the user's profile picture
    },
    viewCount: {
        type: Number, //view count
        default:0
    }

},
{
    timeStamp: true
}

);

module.exports = mongoose.model("User",userSchema);