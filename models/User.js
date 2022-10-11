const {Schema, model} = require('mongoose');
const UserSchema = require(
    {
        usermame: {
            type: String,
            unique:true,
            required: "Provide user name",
            trim: true,
        },
        email: {
            type: String,
            required: "Provide email address",
            unique:true,
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref:'Thoughts',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref:'User',
            }
        ],
    },
    {
        toJSON: {
            virtuals:true,
            getters: true,
        },
        id:false,
    }
);

UserSchema.virtual('friendCount').get(function(){ //gets counts of friends/users
    return this.friend.length;
});

const User = model('User', UserSchema)

module.exports = User;