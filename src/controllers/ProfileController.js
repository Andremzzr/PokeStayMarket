const Player = require('../models/Player');

module.exports = {
    seeProfilePage : async(req,res) => {
        Player.findOne({playerId : req.params.profileId})
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
                        res.render('profilePage', {user: player})

                    }
                }
            }
        )
    }
}