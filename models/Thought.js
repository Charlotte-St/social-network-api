const { Schema, model } = require('mongoose');
const userSchema = require('./User');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            value: this.username, 
            require: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
});

thoughtSchema.virtual('formatDate').get(function (){
    const time = new Date(Date.UTC(this.createdAt));
    return time.toLocaleString('en-US', {timeZone: 'EST'})
  });

module.exports = thoughtSchema;