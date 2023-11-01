const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
    // /api/users/ -- gets all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // /api/users/ -- creates user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // /api/users/:userId -- get single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // /api/users/:userId -- update user 
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            )

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // /api/users/:userId -- delete user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
              }

            // await Thought.deleteMany({ id: { $in: user.thoughts }});
            res.json({ message: 'User has been deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // /api/users/:userId/friends/:friendId -- add a new friend to user's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            const friend = await User.findOne({ _id: req.params.friendId })

            // if one of these id's doesn't match any in the database, return 404 error
            if (!user || !friend) {
                return res.status(404).json({ message: 'User or friend ID was not found.'})
            }

            // check if users are already friends
            const alreadyFriends = user.friends.includes(friend._id);
            if (alreadyFriends) {
            return res.status(400).json({ message: 'This user is already added as a friend!' })
            } else {
                console.log('else statement')
                const friend = await User.findOne({ _id: req.params.friendId })
                const updatedUser = await User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $addToSet: { friends: friend._id } },
                    { new: true }
                );
                
                console.log('added friend?')
                    res.json(updatedUser)
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // /api/users/:userId/friends/:friendId -- remove a friend from a user's friend list
}