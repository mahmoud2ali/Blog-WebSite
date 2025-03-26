const asynHandler = require("express-async-handler");
const bcrypt = require("bcryptjs")
const path = require("path");
const fs = require("fs");
const { User, validateUpdateUser } = require("../models/User");
const { cloudinaryUploadImage, cloudinaryremoveImage, cloudinaryremoveMultipleImage } = require("../utils/cloudinary");
const { use } = require("../routes/usersRoute");
const { profile } = require("console");
const {Comment} = require("../models/Comment")
const {Post} = require("../models/Post")


module.exports.getAllUsersCtrl = asynHandler(async(req, res) => {

    // console.log(req.headers.authorization.split(" ")[1]);

    const users = await User.find().select("-password").populate("posts");

    res.status(200).json(users);
});


// api/users/profile/:id
module.exports.getUserProfileCtrl = asynHandler(async(req, res) => {

    // console.log(req.headers.authorization.split(" ")[1]);


    const user = await User.findById(req.params.id).select("-password").populate("posts");

    if(!user)
    {
        return res.status(404).json({message: "user not foud"});
    } else{
        res.status(200).json(user);
    }
});

module.exports.UpdateUserProfile  = asynHandler(async(req, res) => {

    const { error } = validateUpdateUser(req.body);
    if(error)
    {
        return res.status(400).json({ message: error.details[0].message });
    }

    if(req.body.password)
    {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            password: req.body.password,
            bio: req.body.bio
        }
    }, {new: true}).select("-password").populate("posts");

    res.status(200).json(updatedUser);

});



module.exports.getUsersCountCtrl = asynHandler(async(req, res) => {

    // console.log(req.headers.authorization.split(" ")[1]);


    const count = await User.countDocumentst();

    // console.log(count);


    res.status(200).json(count);

});



module.exports.ProfilePhotoUploadCtrl = asynHandler(async(req, res) => {

    // console.log(req.file)
    if(!req.file)
    {
        return res.status(400).json({message: "no file provided"});
    }

    // console.log(path.join(__dirname, `../imgs/${req.file.filename}`))
    const imagePath = path.join(__dirname, `../imgs/${req.file.filename}`);


    //upload to cloudinary
    const result = await cloudinaryUploadImage(imagePath);
    console.log(result);

    const user = await User.findById(req.user.id);

    if(user.profilePhoto.publicId != null)
    {
        await cloudinaryremoveImage(user.profilePhoto.publicId);
    }

    user.profilePhoto = {
        url: result.secure_url,
        publicId: result.public_id
    }

    await user.save();


    res.status(200).json({message: "your profile photo uploaded successfully" , 
        profilePhoto: {url: result.secure_url, publicId: result.public_id}
    });

    fs.unlinkSync(imagePath)
    
});




module.exports.deleteUserProfileCtrl = asynHandler(async(req, res) => {
   
    const user = await User.findById(req.params.id);
    if(!user)
    {
        return res.status(404).json({message: "user not found"});
    }

    // TODO - delete all posts from DB
    const posts = await Post.find({user: user._id});
    const publicIds = posts?.map((post) => post.image.publicId);
    if(publicIds?.length > 0)
    {
        await cloudinaryremoveMultipleImage(publicIds);
    }

    if(user.profilePhoto.publicId != null){
        // console.log("remove profile image...");
        await cloudinaryremoveImage(user.profilePhoto.publicId); 
    }

    // Delete user posts & comments
    await Post.deleteMany({user: user._id});
    await Comment.deleteMany({user : user._id});

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({message: "your profile has been deleted"});
    
});

  