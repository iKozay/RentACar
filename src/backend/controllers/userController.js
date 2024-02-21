const asyncHandler=require('express-async-handler');
const {body,validationResult} = require("express-validator");
const User=require('../models/users');
exports.user_list  = asyncHandler
(async (req,res,next)=>{
    const users = await User.find({})
    .sort({last_name:1}).exec();
    res.status(200).json(users||[]);
}
)
