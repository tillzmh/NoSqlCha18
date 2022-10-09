const { Thoughts, User} = require('../models');
const thoughtController = {
    getAllThoughts(req, res) { //grabs all of the thoughts 
        Thoughts.find({})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err =>{
            console.log(err);
            return res.status(404).json(err);
        });
    },

    getThoughtsById({params}, res) { // get thoughst by id 
        Thought.findOne({ _id: params.thoughtId })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this ID!' })
            }
            return res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json(err);
        });
},

addThought({ params, body }) { //creting a new thought
    Thought.create({
        thoughtText: body.thoughtText,
        username: body.username,
        userId: params.userId
    })
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $addToSet: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID!' });
                return;
            }
            return res.json(dbUserData);
        })
        .catch(err => res.json(err));
},

}

