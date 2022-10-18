
const { Thought, User} = require('../models');
const thoughtController = {

    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                return res.status(400).json(err);
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

addThought({ params, body }, res) { //creting a new thought
    Thought.create({
        thoughtText: body.thoughtText,
        username: body.username,
        userId: params.userId
    })
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $addToSet: { thought: _id } },
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

updateThought({ params, body }, res) { //updating thoughts
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        body,
        { new: true }
    )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that ID!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
},

deleteThoughts({params }, res) { //deletedd thoughts 
    Thought.findOneAndDelete(
        { _id: params.thoughtId}
    )
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message:'no user found with this ID!'});
            return;
        } return res.json(dbUserData);
    })
    .catch(err => res.json(err));
},

addRecation({params, body}, res) { //to post a reaction 
    Thought.findOneAndUpdate(
        { _id: params.thoughtId},
        { $addToSet: { reaction: body } },
        {new: true, runValidators: true },
    )
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({ message: 'no user found with this ID' });
            return;
        }
        return res.json(dbUserData);
    })
    .catch(err => res.json(err));
},

deleteReactions({params,}, res) { //delete a reacton 
    Thought.findOneAndUpdate(
        { _id: params.thoughtsId},
        {$pull:{reaction:{reaction_id:params.reaction_id}}},
        {new: true},
    )
    .then(dbUserData => {
        if(!dbUserData){
            response.status(404).json({message: 'User not found with this ID'});
        }
    })
    .catch(err => res.json(err));
}

};


module.exports = thoughtController;