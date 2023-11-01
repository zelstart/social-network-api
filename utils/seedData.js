const connection = require('../config/connection'); 
const User = require('../models/User'); 
const Thought = require('../models/Thought');

// Define some initial users and thoughts
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
    username: 'john_doe'
  },
  {
    thoughtText: 'Another test thought by Jane',
    username: 'jane_doe'
  }
];

// Function to seed the database
async function seedDatabase() {
  try {
    // Delete all existing users
    await User.deleteMany({});

    // Create users
    const createdUsers = await User.insertMany(users);

    // Assign user IDs to thoughts
    const thoughtsWithUserIds = thoughts.map(thought => {
      const user = createdUsers.find(user => user.username === thought.username);
      return { ...thought, username: user._id };
    });

    // Create thoughts
    await Thought.insertMany(thoughtsWithUserIds);

    // Add friends
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
    // Disconnect from the database after seeding
    connection.close();
  }
}

// Call the seeding function
seedDatabase();
