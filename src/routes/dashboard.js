const express = require("express");
const router = express.Router();
const Pokemon = require("../models/Pokemon");

const {
    buyPokemon,
    sellPokemon
} = require('../controllers/PokemonController');

const {
    seeProfilePage
} = require('../controllers/ProfileController');

function isAuthorized(req,res,next) {
    if(req.user){        
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
        res.redirect('/');
    }
    
});

router.get('/profile/', isAuthorized , async (req,res) => {
    try{       
        res.render('profile',{user : req.user});
    }
    catch(err) {
        console.log(err);
    }
    
});

router.get('/:profileId/page', isAuthorized, seeProfilePage);

router.get('/buy/:pokemonId', isAuthorized, buyPokemon);

router.get('/sell/:pokemonId', isAuthorized, async(req,res) => {
    try{
        res.render('pokemon',{user : req.user, pokemonId :req.params.pokemonId });
    }
    catch(err) {
        console.log(err);
    }
});

router.post('/sell/:pokemonId')



module.exports = router;