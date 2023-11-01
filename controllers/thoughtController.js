const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
    // /api/thoughts/ -- gets all thoughts
async getThoughts(req, res) {
    try {
         const thoughts = await Thought.find()
         res.json(thoughts)
    } catch (err) {
        res.status(500).json(err)
    }
},

// /api/thoughts -- creates a new thought
async createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);
        res.json(thought)
    } catch (err) {
        res.status(500).json(err)
    }
}


// /api/thoughts/:thoughtId -- gets thought by id


    // /api/thoughts/:thoughtId -- update thought by id


    // api/thoughts/thought:Id -- delete thought by id


    // /api/thoughts/:thoughtId/reactions -- create a reaction to a thought


    // api/thoughts/:thoughtId/reactions -- delete a reaction to a thought

}