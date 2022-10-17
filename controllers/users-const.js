const { User, Thought} = require('../models/index');
const Thoughts = require('../models/Thought');
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

    updateUser({params, body}, res) { // update user by id
        User.findOneAndUpdate(
            {_id:params.id},
            body, 
            {new:true, runValidators:true},
        )
        .then(dbUserData => {
            if (!dbUserData){
                res.status(404).json({message: 'User not found'});
                return;
            }
            return res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteUser({params}, res) {
        User.findOneAndUpdate({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'User not found with this ID'});
                return;
            }
            return Thoughts.deleteMany({userId:params.id})
        })
        .then(data => res.json(data))
        .catch(err => res.status(400).json(err));
    },

}