const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const { Post, validateCreatePost, validateUpdatePost } = require("../models/Post");
const { cloudinaryUploadImage, cloudinaryremoveImage } = require("../utils/cloudinary");
const { title } = require("process");
const {Comment} = require("../models/Comment")
const { User } = require("../models/User");
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
    console.log(result)
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


module.exports.GetAllPostsCtrl = asyncHandler (async (req, res)=>{
    const POST_PER_PAGE = 3;

    const {pageNumber, category} = req.query;
    let posts;

    if(pageNumber)
    {
        posts = await Post.find()
            .skip((pageNumber - 1) * POST_PER_PAGE)
            .limit(POST_PER_PAGE)
            .sort({createdAt: -1})
            .populate("user", ["name", "_id", "-password"]);
    }
    else if (category)
    {
        posts = await Post.find({category})
            .sort({createdAt: -1})
            .populate("user", ["-password"]);
    } 
    else 
    {
        posts = await Post.find().sort({createdAt: -1}).populate("user");
        console.log(posts);
    }

    res.status(200).json({posts});

});



module.exports.GetSinglePostCtrl = asyncHandler (async (req, res)=>{
    const post = await Post.findById(req.params.id)
        .populate("user", ["-password"])
        .populate({path: "comments", options:{virtuals: true} });
        
        console.log("user's post", post.comments)

    if(!post)
    {
        return res.status(404).json({message: "post not found"});
    }

   
    res.status(200).json({post});

});



module.exports.GetPostCountCtrl = asyncHandler (async (req, res)=>{
    
    const count = await Post.countDocuments();
   
    res.status(200).json({count});
});



module.exports.DeletePostCtrl = asyncHandler (async (req, res)=>{
    const post = await Post.findById(req.params.id);
    if(!post)
    {
        return res.status(404).json({message: "post not found"});
    }

    
    if(req.user.isAdmin || req.user.id === post.user.toString())
    {
        
        await Post.findByIdAndDelete(req.params.id);
        await cloudinaryremoveImage(post.image.publicId);

        // Delete All Commments that Belong to this Post
        await Comment.deleteMany({postId: post._id});

        res.status(200).json({message: "post has been deleted successfully", postId: post._id});
    }
    else
    {
        res.status(403).json({message: "acess denied, forbidden"})
    }


});



module.exports.UpdatePostCtrl = asyncHandler (async (req, res)=>{
    
    const {error} = validateUpdatePost(req.body);
    if(error)
    {
        return res.status(400).json({message: error.details[0].message});
    }

     
    const post = await Post.findById(req.params.id);
    if(!post)
    {
        return res.status(404).json({message: "post not found"});
    }

    if(req.user.id !== post.user.toString())
    {
        return res.status(403).json({message: "access denied, you are not allowed"});
    }    


    console.log(req.body.title,req.body.description,req.body.category)

    const updatePost = await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
    }, {new: true}).populate("user", ["-password"]);

    res.status(200).json({message: "post has been updated successfully", updatePost});

});


module.exports.UpdatePostImageCtrl = asyncHandler (async (req, res)=>{
    
    if(!req.file)
    {
        return res.status(400).json({message: "no image provided"});
    }

     
    const post = await Post.findById(req.params.id);
    if(!post)
    {
        return res.status(404).json({message: "post not found"});
    }

    if(req.user.id !== post.user.toString())
    {
        return res.status(403).json({message: "access denied, you are not allowed"});
    }    


    await cloudinaryremoveImage(post.image.publicId);

    const imagePath = path.join(__dirname, `../imgs/${req.file.filename}`);
    const result = await cloudinaryUploadImage(imagePath);


    const updatePost = await Post.findByIdAndUpdate(req.params.id, {
        $set: {
            image:{
                url: result.secure_url,
                publicId: result.public_id
            }
        }
    }, {new: true});

    res.status(200).json(updatePost);

    fs.unlinkSync(imagePath);

});


module.exports.ToggleLikeCtrl = asyncHandler (async (req, res)=>{
    
    const loggedInUser = req.user.id;
    const { id: postId } = req.params;  
    
    let post = await Post.findById(postId);

    if(!post)
    {
        return res.status(404).json({message: "post not found"});
    }

    
    const isPostAlreadyLiked = post.likes.find((user) => user.toString() === loggedInUser);
    
    if(isPostAlreadyLiked)
    {
        post = await Post.findByIdAndUpdate(postId, {
            $pull: {
                likes: loggedInUser
            }
        }, {new: true});
    }
    else{
        post = await Post.findByIdAndUpdate(postId, {
            $push: {
                likes: loggedInUser
            }
        }, {new: true});
    }

    res.status(200).json(post);

});