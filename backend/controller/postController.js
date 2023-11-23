const asynHandler = require("express-async-handler");
const Blog = require("../models/Blog");
const User = require("../models/UserModel");

const createPost = asynHandler(async(req,res)=>{
    const {heading,topic,para,style} = req.body;

    
    if(!heading || !topic || !para)
    {
        res.status(400);
        throw new Error("All detatails are necessary")
    }   
    const {userName} = req.user;
    // console.log(req.user);
    const user = await User.findOne({userName});
    const data = await Blog.create(
        {
            userName, heading,topic,para,style
        }
        )
        
        //save the post on users post list
        user.post.push(data._id);
        user.save();
        // console.log(data);
    res.status(201);
    res.send(data)

    
})

const getAllPosts = asynHandler(async(req,res)=>{
    const posts = await Blog.find().sort({ _id: -1 }).limit(10);
    
    res.json(posts);
})
const getPost = asynHandler(async(req,res)=>{
    res.send("as")
})
module.exports = {createPost,getPost,getAllPosts};
