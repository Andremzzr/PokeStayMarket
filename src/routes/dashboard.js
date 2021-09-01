const express = require("express");
const router = express.Router();
const Pokemon = require("../models/Pokemon");
const Player = require('../models/Player');

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

router.get('/buy/:pokemonId', isAuthorized, async(req,res) =>{
    
        const {pokemonId}= req.params;
        const {user} = req; 
        
        Pokemon.findOne({pokemonId:pokemonId})
        .then(
            pokemon => {
                Player.findOne({playerId : user.playerId})
                .then( buyer => {

                    if(pokemon.playerId === buyer.playerId){
                        console.log("Should be stoped");
                        res.redirect('/dashboard');
                    }
                    else if(pokemon.price > buyer.points){
                        console.log("You don't have enough points");
                        res.redirect('/dashboard');
                    }
                    else{
                        let pokemonArray = buyer.pokemons;
                        pokemonArray.push({
                            name: pokemon.pokemonName,
                            type: pokemon.type,
                            image: pokemon.image,
                            shiny : pokemon.shiny,
                            selling: false
                        });

                        const buyerPoints = buyer.points;

                        Player.updateOne({playerId: req.user.playerId},{
                            pokemons : pokemonArray,
                            points : buyerPoints - pokemon.pokemonPrice
                        }, err => console.log(`You bought the ${pokemon.pokemonName} ${pokemon.pokemonId}`));

                        Player.findOne({playerId: pokemon.playerId})
                            .then(
                                owner =>{
                                    const ownerPoints = owner.points;
                                    Player.updateOne({playerId: pokemon.playerId},{
                                        points: ownerPoints + pokemon.pokemonPrice
                                    },err => console.log(`Player ${pokemon.playerId} receive ${ pokemon.pokemonPrice} pts!`) );   

                                    Pokemon.deleteOne({pokemonId : pokemonId},err => console.log("Pokemon sold"));

                                    res.redirect('/dashboard/profile');
                                }
                            )
                        }
                    
                })
            }
        )

    
});
module.exports = router;