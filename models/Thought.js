const { Schema } = require('mongoose');
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
    get: (timestamp) => format(timestamp, 'yyyy-MM-dd HH:mm:ss')
  }
});

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
    get: (timestamp) => format(timestamp, 'yyyy-MM-dd HH:mm:ss')
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

module.exports = model('Thought', thoughtSchema);
