const passport = require('passport');
const jwt = require('jsonwebtoken');
const {Strategy:JwtStrategy,ExtractJwt}=require('passport-jwt');
const jwtSecret= process.env.JWT_SECRET;
const User = require('./../models/userModel');

const jwtOptions={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:jwtSecret
}
// this strategy takes the secure key and a function to
// verify the token, and then in case the token is not valid
// the error will be caught and false will be returned,
// in the case the JWT is valid, it searches for the user

const strategy = new JwtStrategy(jwtOptions,async(payload,done)=>{
    try{
        const user = await User.findById(payload.id);
        if(!user){
           return done(null,false);
        }
        return done(null,user);
    }
    catch(error){
        return done(error,false);
    }
})

passport.use(strategy);

module.exports={
    initialize: passport.initialize(),
    authenticate:  (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                return res.status(500).json({ error: "Internal Server Error" });
            }
            if (!user) {
                return res.status(401).json({ error: "Unauthorized" }); // Adjust this error message as needed
            }
            req.user = user;
            next();
        })(req, res, next);
    }
}