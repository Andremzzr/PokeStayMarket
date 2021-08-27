const express = require("express");
const router = express.Router();
const Pokemon = require("../models/Pokemon");

function isAuthorized(req,res,next) {
    if(req.user){
        console.log("User is logged in : " + req.user.playerId);
        
        next();
    }
    else{
        console.log("User is not log in");
        res.redirect('/');
    }
}

router.get('/logout', (req,res) => {
    if(req.user){
        req.logout();
        res.redirect('/');
    }
    else{
        res.redirect('/');
    }
});

router.get('/', isAuthorized , async (req,res) => {
    try{
        const pokemons = await Pokemon.find({});
        res.render('dashboard', {
             pokemons
        });
    }
    catch(err) {
        console.log(err);
    }
    
});

router.get('/profile', isAuthorized , async (req,res) => {
    try{
        res.json(req.user);
    }
    catch(err) {
        console.log(err);
    }
    
});

module.exports = router;