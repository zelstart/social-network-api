const connection = require('../config/connection'); 
const User = require('../models/User'); 
const Thought = require('../models/Thought');

// define some initial users and thoughts
const users = [
  {
    username: 'john_doe',
    email: 'john@example.com'
  },
  {
    username: 'jane_doe',
    email: 'jane@example.com'
  },
  {
    username: 'bob_smith',
    email: 'bob@example.com'
  },
  {
    username: 'susan_smith',
    email: 'susan@example.com'
  }
];

const thoughts = [
  {
    thoughtText: 'This is a test thought by John',
    userId: '', // placeholder for user ID
    username: 'john_doe'
  },
  {
    thoughtText: 'Another test thought by Jane',
    userId: '', // polaceholder for user ID
    username: 'jane_doe'
  }
];

// function to seed the database
async function seedDatabase() {
  try {
    // delete all existing users
    await User.deleteMany({});
    await Thought.deleteMany({});

    // create users
    const createdUsers = await User.insertMany(users);

    // assign user IDs to thoughts
    const thoughtsWithUserIds = thoughts.map(thought => {
      const user = createdUsers.find(user => user.username === thought.username);
      thought.userId = user._id; // assign the user's _id to userId
      return thought;
    });

    // create thoughts
    await Thought.insertMany(thoughtsWithUserIds);

    // add friends
    const john = createdUsers.find(user => user.username === 'john_doe');
    const jane = createdUsers.find(user => user.username === 'jane_doe');
    const bob = createdUsers.find(user => user.username === 'bob_smith');
    const susan = createdUsers.find(user => user.username === 'susan_smith');

    john.friends.push(jane._id);
    jane.friends.push(john._id, bob._id);
    bob.friends.push(jane._id, susan._id);
    susan.friends.push(bob._id);

    await Promise.all([john.save(), jane.save(), bob.save(), susan.save()]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // disconnect from the database after seeding
    connection.close();
  }
}

// call the seeding function
seedDatabase();
