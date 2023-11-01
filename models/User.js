const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email),
      message: 'Please enter a valid email address'
    }
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema)
module.exports = User;
