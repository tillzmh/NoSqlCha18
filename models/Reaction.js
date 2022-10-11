const {Schema, Types} = require("mongoose")
const dateFormat = require('../utilies/dateFormat')

const reactionSchema = new Schema({
    reactionID:{
        type:Schema.Types.ObjectedId, 
        default: () => new Types.ObjectedId(),
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