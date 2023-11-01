const connection = require('../config/connection'); 
const User = require('../models/User'); 
const Thought = require('../models/Thought')

// define some initial users and thoughts
const users = [
  {
    username: 'john_doe',
    email: 'john@example.com'
  },
  {
    username: 'jane_doe',
    email: 'jane@example.com'
  }
];

const thoughts = [
  {
    thoughtText: 'This is a test thought by John',
    username: 'john_doe'
  },
  {
    thoughtText: 'Another test thought by Jane',
    username: 'jane_doe'
  }
];

// function to seed the database
async function seedDatabase() {
  try {
    // create users
    const createdUsers = await User.insertMany(users);

    // assign user IDs to thoughts
    const thoughtsWithUserIds = thoughts.map(thought => {
      const user = createdUsers.find(user => user.username === thought.username);
      return { ...thought, username: user._id };
    });

    // create thoughts
    await Thought.insertMany(thoughtsWithUserIds);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    //disconnect from the database after seeding
    connection.close();
  }
}

// call the seeding function
seedDatabase();
