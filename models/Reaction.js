const {Schema, Types} = require("mongoose")
const dateFormat = require('../utilies/dateFormat.js')

const reactionSchema = new Schema({
    reactionID:{
        type:Schema.Types.ObjectId, 
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type:String,
        required:true,
        maxLenght: 280
    },

    username: {
        type: String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
{
    toJSON:{
        getters:true,
    },
    id:false,
    _id:false,
}
);

module.exports = reactionSchema;