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

    getUserById({params}, res) { //get user by id ans will find thoughts for users
        User.findOne({_id: params.id})
        .populate({path:'thoughts', select: '-__v'})
        .populate({path:'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData){
                res.status(404).send({message: 'User not found'});
                return;
            }
            return res.json(dbUserData);
        })
.catch(err => {
    console.log(err);
    return res. status(404).json(err);
});
    },

    createUser({body}, res) { //created a new user
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(404).json(err));
    },




}