const DiscordStrategy = require("passport-discord").Strategy;
const passport = require('passport');
const Player = require('../models/Player');

passport.serializeUser((user,done) => {
    done(null,user.playerId);
});

passport.deserializeUser(async (id,done) =>{
    const user = await Player.findOne({playerId: id});

    if(user){
        done(null,user)
    }
});

passport.use(new DiscordStrategy({
    clientID : process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL : process.env.CLIENT_REDIRECT,
    scope: ['identify']
}, async (acessToken,refreshToken,profile,done) => {
    try{ 
        const user = await Player.findOne({playerId : profile.id});

        if(user){
            done(null,user);
        }
    }
    catch(err) {
        console.log(err);
        done(err,null);
    }
    
}));