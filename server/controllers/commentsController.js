const asyncHandler = require("express-async-handler");
const {Comment, validateCreateComment, validateUpdateComment} = require("../models/Comment");
const {User} = require("../models/User");


module.exports.createCommentCtrl = asyncHandler(async (req, res)=>{
    const {error} = validateCreateComment(req.body);
    if(error)
    {
        return res.status(400).json({message: error.details[0].message});
    }  
    
    const profile = await User.findById(req.user.id);

    const comment = await Comment.create({
        postId: req.body.postId,
        text: req.body.text,
        userId: req.user.id,
        userName: profile.username
    })
    
    res.status(201).json(comment);

});


// Only Admin
module.exports.getAllCommentsCtlr = asyncHandler(async (req, res)=>{
    // if(!req.user.isAdmin)
    //     return res.status(403).json({message: "access denied, Only Admin"});

    const comments = await Comment.find().populate("userId", ["-password"]);
    res.status(201).json(comments);

});

// Only Admin and owner
module.exports.deleteCommentCtrl = asyncHandler(async (req, res)=>{

    const comment = await Comment.findById(req.params.id);
    
    if(!comment)
    {
        return res.status(404).json({message: "comment not found"});
    }

    if(req.user.isAdmin || req.user.id === comment.user.toString())
    {
        await Comment.findByIdAndDelete(req.params.id);
        return res.status(201).json({message: "comment has been deleted successfully"});
    }
    else 
    {
        return res.status(403).json({message: "acess denied, not allowed"})
    }
});

// Only owner
module.exports.updateCommentCtrl = asyncHandler(async (req, res)=>{
    const {error} = validateUpdateComment(req.body);
    if(error)
    {
        return res.status(400).json({message: error.details[0].message});
    }  

    const comment = await Comment.findById(req.params.id);
    if(!comment)
    {
        return res.status(404).json({message: "comment not found"});
    }

    if(req.user.id !== comment.userId.toString())
    {
        return res.status(403).json({message: "acess denied, not allowed"})
    }

    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {
        $set:{
            text: req.body.text,
        }
    }, { new: true });

    res.status(200).json(updatedComment);

});