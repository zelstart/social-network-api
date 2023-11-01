const { Schema, model } = require('mongoose');
const { format } = require('date-fns');


const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Schema.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => format(timestamp, 'MM-dd-yyyy hh:mm:ss a')
  }
},
{
  toJSON: {
    virtuals: true,
  }
}
);

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => format(timestamp, 'MM-dd-yyyy hh:mm:ss a')
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
},
{
  toJSON: {
    virtuals: true,
  }
}
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
module.exports = Thought
