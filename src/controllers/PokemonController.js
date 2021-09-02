const Pokemon = require("../models/Pokemon");
const Player = require('../models/Player');

module.exports = {
    buyPokemon: async (req,res) =>{
        const {pokemonId}= req.params;
        const {user} = req; 
        
        Pokemon.findOne({pokemonId:pokemonId})
        .then(
            pokemon => {
                Player.findOne({playerId : user.playerId})
                .then( buyer => {

                    if(pokemon.playerId === buyer.playerId){
                        res.redirect('/dashboard');
                    }
                    else if(pokemon.price > buyer.points){
                        res.redirect('/dashboard');
                    }
                    else{
                        let pokemonArray = buyer.pokemons;
                        pokemonArray.push({
                            name: pokemon.pokemonName,
                            type: pokemon.type,
                            image: pokemon.image,
                            shiny : pokemon.shiny,
                            pokemonId: pokemon.pokemonId,
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
    },


    sellPokemon: async (req,res) => {
        const {pokemonId}= req.params;
        const {user} = req; 
    }
}