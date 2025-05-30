const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { Post } = require("./Post");

const UserSchema = new mongoose.Schema({
    username:{
        type : String,
        required: true,
        trim: true,
        minlength: 2, 
        maxLength: 100,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        minlength:5, 
        maxLength: 100,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength:8,
    },
    profilePhoto:{
        type: Object,
        default:{
            url:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            publicID: null,
        }
    },
    bio:{
        type: String
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    isAccountVerfied:{
        type: Boolean,
        default: false,
    },
},{
    timestamps: true,
    toJSON:{virtuals: true},
    toObject: {virtuals: true}
});

UserSchema.virtual("posts", {
        ref: "Post",
        foreignField: "user",
        localField: "_id"
})


// generate auth token
UserSchema.methods.generateAuthToken = function()
{
    return jwt.sign({id:this._id, isAdmin : this.isAdmin}, process.env.JWT_SECRET);
}

// user model
const User = mongoose.model("User", UserSchema);

// validate Register user
function validateRegisterUser(obj)
{
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100).required(),
        email: Joi.string().trim().min(5).max(100).required().email(),
        password : Joi.string().trim().min(8).required(),
    });
    return schema.validate(obj)
}

// validate login user
function validateLoginUser(obj)
{
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password : Joi.string().trim().required(),
    });
    return schema.validate(obj)
}


function validateUpdateUser(obj)
{
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100),
        password : Joi.string().trim().min(2),
        bio: Joi.string(),
    });
    return schema.validate(obj)
}

module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser
}