const Pokemon = require("../models/Pokemon");
const Player = require('../models/Player');
const handleActivitie = require('../activities/handleActivities');


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
                        req.flash('message', "This pokemon is yours");
                        res.redirect('/dashboard');
                    }
                    else if(pokemon.price > buyer.points){
                        req.flash('message', "You don't have enough points to buy this pokemon");
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
                        handleActivitie(pokemon.image, `Bought a ${pokemon.pokemonName}`, buyer);
                        Player.updateOne({playerId: req.user.playerId},{
                            pokemons : pokemonArray,
                            points : buyerPoints - pokemon.pokemonPrice,
                            activities: buyer.activities
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
        if(parseInt(points) < 0) {
            req.flash('message', 'You cannot sell your pokemon for a negative price');
            res.redirect(`/dashboard/sell/${pokemonId}`);
            return;
        }
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

                    handleActivitie(sellingPokemon[0].image,`Sold a ${sellingPokemon[0].name}`,player);

                    newPokemon.save()
                    .then(pokemon => console.log(`Pokemon saved: ${pokemon.pokemonId}`))
                    .catch(err => console.log(`Error: ${err}`));

                    Player.updateOne({playerId : user.playerId}, {
                        pokemons : newPokemons,
                        activities: player.activities
                     }, (err)=>{ res.redirect('/dashboard/profile')})

                }


            }

        })
    }
}