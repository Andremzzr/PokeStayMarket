const express = require("express");
const router = express.Router();
const passport = require('passport');


router.get('/', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbiden',
    successRedirect: 'https://pokestay.herokuapp.com/dashboard'
}), async (req,res) => {
    if(req.user){

        res.json(req.user);
    }
    else{
        res.send("You're not in the database");
    }
});





module.exports= router;