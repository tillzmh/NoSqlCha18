const { User, Thought} = require('../models/index');
const userController = {
    
    getAllUsers(req, res) { // get all user 
        User.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v -thoughts'})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
        })
    },


}