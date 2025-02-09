const asynHandler = require("express-async-handler");
const  bcrypt = require('bcryptjs');
const { User, validateRegisterUser, validateLoginUser } = require("../models/User");


// register user ...
module.exports.registerUserCtrl = asynHandler(async (req,res) => {
    const { error } = validateRegisterUser(req.body);
    if(error)
    {
        return res.status(400).json({message: error.details[0].message});
    }


    let user = await User.findOne({email: req.body.email})
    if(user)
    {
        return res.status(400).json({message: "user already exist"});
    }

   
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password : hashPassword,
    })
    
    await user.save();

    // TODO - sending email (verfy account)

    res.status(201).json({message : "you registerd successfully, please log in"});
})


// login user ...
module.exports.loginUser = asynHandler(async(req, res) =>{
    const { error } = validateLoginUser(req.body);
    if(error)
    {
        return res.status(400).json({message: error.details[0].message});
    }

    let user = await User.findOne({email: req.body.email});
    if(!user)
    {
        return res.status(400).json({message: "Invalid email or password"});
    }


    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if(!isPasswordMatch)
    {
        return res.status(400).json({message: "Invalid email or password"});
    }


    // TODO - sending email (verfy account if not verified)

    const token = user.generateAuthToken();

    res.status(200).json({
        _id: user._id,
        isAdmin: user.isAdmin,
        profilePhoto: user.profilePhoto,
        token,
        username: user.username
    })

})