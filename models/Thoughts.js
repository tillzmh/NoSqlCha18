const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utilities/DateFormat');

const ThoughtsSchema = new Schema(
    {
        thoughtsText: {
            type: String,
            required:true,
            minLength:1,
            maxLength:280
        },
    },
    {
        createdAt:{
            type:Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal),
    },
},
{
    username: {
        type: String,
        required:true,
    },
},
{
    userId: {
        type: String,
        required:true,
    },
},
{
    reactions: [reactionSchema],
},
{
    toJSON: {
        getters: true,
        virtuals: true,
    },
    id:false,
},
    
);

ThoughtsSchema.virtuals('reactionCount').get(function(){
    return this.reaction.length;
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts; 