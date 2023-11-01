const User  = require('../models/User');

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
            res.json(user)
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
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json(user)
            
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // /api/users/:userId -- update user 

    // /api/users/:userId -- delete user
}