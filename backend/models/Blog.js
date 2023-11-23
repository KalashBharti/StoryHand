const mongoose = require("mongoose");

const Blog = mongoose.Schema({
    userName:{
        type: String,
        required: [true, "the userName field is required"]
    },
    likes:{
        type: Number,
       default:0
    },
    comments:[{
        userName:{
            type:String
        },
        message:{
            type:String
        }
    }],
    heading:{
        type:String
    },
    topic:{
        type:String
    },
    para:[{
        type:Object,
        chapter:{
            type:String
        },
        text:{
            type:String
        }

    }],
    style:{
        type:Object
    }
},
{
    timeStamp: true
}
)

module.exports = mongoose.model("Blog",Blog);