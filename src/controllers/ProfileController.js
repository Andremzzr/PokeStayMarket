const Player = require('../models/Player');

module.exports = {
    seeProfilePage : async(req,res) => {
        const {profileId} = req.params;
        Player.findOne({playerId : profileId})
        .then(
            player => {
                if(player == undefined){
                    res.render('404');
                }
                else{
                    if(player.playerId == req.user.playerId){
                        res.redirect('/dashboard/profile');
                    }
                    else{
                        res.render('profilePage', {user: player});

                    }
                }
            }
        )
    },

    seePlayers: async (req,res) => {
        const {player} = req.body;

        Player.findOne({tag: player})
        .then(
            players => {
                if(players == undefined){
                    res.redirect('/dashboard/playerNotFound/');
                }
                else{
                    res.redirect(`/dashboard/${players.playerId}/page`);
                }
            }
        )
    },

    seeLeaderboard: async(req,res) => {
        const players = await Player.find({points:{$gt:0}});

        const playersLeaderboard = players.sort((a,b) => b.points - a.points);

        if(players)res.render('leader', {playersLeaderboard});
    }
}