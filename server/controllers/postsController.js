const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const { Post, validateCreatePost } = require("../models/Post");
const { cloudinaryUploadImage } = require("../utils/cloudinary");
const { title } = require("process");

// Create New Post
module.exports.createPostCtrl = asyncHandler (async (req, res)=>{
    
    //validation for Image
    if(!req.file)
    {
        return res.status(400).json({message: "no image provided"});
    }

    //validation for data
    const {error} = validateCreatePost(req.body)
    if(error)
    {
        return res.status(400).json({message: error.details[0].message});
    }

    //upload photo
    const imagePath = path.join(__dirname, `../imgs/${req.file.filename}`);
    const result = await cloudinaryUploadImage(imagePath);
    
    //create ne post and save it to db
    const post = await Post.create({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        user: req.user.id,
        image: {
            url: result.secure_url,
            publicId: result.public_id
        }
    });

    //send response to the client
    res.status(200).json(post);

    //remove image form the server
    fs.unlinkSync(imagePath);
});
