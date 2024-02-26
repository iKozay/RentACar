const asyncHandler=require('express-async-handler');
const {body,validationResult} = require("express-validator");
const User=require('../models/users');
exports.user_list  = asyncHandler(async (req,res,next)=>{
    const users = await User.find({})
    .sort({last_name:1}).exec();
    res.status(200).json(users||[]);
}
)
exports.user_detail = asyncHandler (async (req,res)=>{
    const userId=req.params.userId;
    const user = await User.findById(userId).exec();
    if(user === null){
        res.status(404).json({error:"User doesn't exist"})
    }
    res.json(user);
})