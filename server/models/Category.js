const mongoose = require('mongoose');
const Joi = require("joi");

const categorySchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},  
    {
        timestamps: true,
    }
);

const Category = mongoose.model("Category", categorySchema);


//validate Create Post
function validateCreateCategory(Object){
    const schema = Joi.object({
        title: Joi.string().required(),
    });
    return schema.validate(Object)
}



module.exports = {
    Category,
    validateCreateCategory
}
