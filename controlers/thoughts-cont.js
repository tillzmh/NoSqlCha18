const { response } = require('express');
const { Thoughts, User} = require('../models');
const thoughtController = {

    getAllThoughts(req, res) { //grabs all of the thoughts 
        Thoughts.find({})
        .select('-__v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err =>{
            console.log(err);
            return res.status(404).json(err);
        });
    },

    getThoughtsById({params}, res) { // get thoughst by id 
        Thoughts.findOne({ _id: params.thoughtId })
        .select('-__v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thought found with this ID!' })
            }
            return res.json(dbThoughtsData)
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json(err);
        });
},

addThought({ params, body }) { //creting a new thought
    Thoughts.create({
        thoughtsText: body.thoughtsText,
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

updateThought({ params, body }, res) { //updating thoughts
    Thoughts.findOneAndUpdate(
        { _id: params.thoughtsId },
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
    Thoughts.findOneAndDelete(
        { _id: params.thoughtsId}
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
    Thoughts.findOneAndUpdate(
        { _id: params.thoughstId},
        { $addToSet: { reaction: body } },
        {new: true, runValidators:true },
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
    Thoughts.findOneAndUpdate(
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


exports.module = thoughtController;