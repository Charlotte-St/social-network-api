/* 

* `createdAt`

  * Use a getter method to format the timestamp on query

* `username` (The user that created this thought)
  * String
  * Required

* `reactions` (These are like replies)
  * Array of nested documents created with the `reactionSchema`

**Schema Settings**:

Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.

*/

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
            value: this.username
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
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;