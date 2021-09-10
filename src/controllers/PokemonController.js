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
        const {points} = req.body;
        
        Player.findOne({playerId: user.playerId})
        .then( player => {
            if(player == undefined){
                res.redirect('/dashboard');
            }
            else{

                let insertedIdPokemon;

                user.pokemons.forEach(pokemon =>{
                    if(pokemon.pokemonId == pokemonId){
                        insertedIdPokemon = pokemonId;
                        pokemon.selling = true;
                    }
                });

                if(insertedIdPokemon == undefined){
                    res.redirect('/dashboard');
                    return;
                }

                else{
                    let sellingPokemon=  user.pokemons.filter(pokemon => {
                        return pokemon.selling == true;
                     })
     
                    let newPokemons = user.pokemons.filter(pokemon => {
                         return pokemon.selling == false;
                    })

                    const pokemonObj = user.pokemons.filter(pokemon=> pokemon.pokemonId == insertedIdPokemon);
               

                    const newPokemon = new Pokemon({
                        playerId : user.playerId,
                        pokemonPrice: parseInt(points),
                        pokemonId : pokemonObj[0].pokemonId,
                        pokemonName: sellingPokemon[0].name,
                        image : sellingPokemon[0].image,
                        type:  sellingPokemon[0].type,
                        shiny : sellingPokemon[0].shiny
                    });

                    newPokemon.save()
                    .then(pokemon => console.log(`Pokemon saved: ${pokemon.pokemonId}`))
                    .catch(err => console.log(`Error: ${err}`));

                    Player.updateOne({playerId : user.playerId}, {
                        pokemons : newPokemons
                     }, (err)=>{ res.redirect('/dashboard/profile')})

                }


            }

        })
    }
}