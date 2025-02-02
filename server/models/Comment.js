const mongoose = require("mongoose");
const Joi = require("joi");
const { text } = require("express");

const commentSchema = new mongoose.Schema({
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text:{
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

const Comment = mongoose.model("Comment", commentSchema);


function validateCreateComment(obj){
    const schema = Joi.object({
        postId: Joi.string().required().label("Post ID"),
        text: Joi.string().required()
    });
    return schema.validate(obj);
}



function validateUpdateComment(obj){
    const schema = Joi.object({
        text: Joi.string().required()
    })
    return schema.validate(obj);
}


module.exports = {
    Comment,
    validateCreateComment,
    validateUpdateComment
}