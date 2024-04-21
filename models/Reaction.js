/*



* `createdAt`
  * Date
  * Set default value to the current timestamp
  * Use a getter method to format the timestamp on query

*/




const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectID,
            default: () => new Types.ObjectId(),

        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String, 
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }
);

reactionSchema.virtual('formatDate').get(function (){
  const time = new Date(Date.UTC(this.createdAt));
  return time.toLocaleString('en-US', {timeZone: 'EST'})
})

module.exports = reactionSchema;