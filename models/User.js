/* 

Need to add email validation

* `friends`
  * Array of `_id` values referencing the `User` model (self-reference)
*/

const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');
//const friendSchema = require('./Friend');

const userSchema = new Schema(
    {
        username: {
            type: String, 
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,

        }, 
        thoughts: [thoughtSchema],
        friends: [
            {
            type: Schema.Types.ObjectID,
            ref: 'user'
            }
        ]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

userSchema.virtual('friendCount').get(function(){
    return this.friends.length
})

const User = model('user', userSchema);

module.exports = User;