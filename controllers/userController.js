const User  = require('../models/User');

module.exports = {
    // api/users/ -- gets all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // api/users/ -- creates user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            req.json(user)
        } catch (err) {
            res.status(500).json(err);
        }
    },
}