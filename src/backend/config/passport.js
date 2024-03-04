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

const strategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        console.log("Payload:", payload);
        const user = await User.findById(payload.id);
        if (!user) {
            console.log("User not found");
            return done(null, false);
        }
        console.log("User found:", user);
        return done(null, user);
    } catch (error) {
        console.error("Error during authentication:", error);
        return done(error, false);
    }
});


passport.use(strategy);

module.exports = {
    initialize: passport.initialize(),
    authenticate:passport.authenticate('jwt',{session:false})
    // authenticate: (req, res, next) => {
    //     console.log("Authentication middleware invoked");
    //     passport.authenticate('jwt', { session: false }, (err, user, info) => {
    //         if (err) {
    //             console.error("Error during authentication:", err);
    //             return res.status(500).json({ error: "Internal Server Error" });
    //         }
    //         if (!user) {
    //             console.log("User not authenticated");
    //             return res.status(401).json({ error: "Unauthorized" });
    //         }
    //         console.log("User authenticated:", user);
    //         req.user = user;
    //         next();
    //     })(req, res, next);
    // }
};
