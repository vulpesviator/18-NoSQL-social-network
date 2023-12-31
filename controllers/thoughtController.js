// Imports Thought and User models
const { Thought, User } = require('../models');

module.exports = {
    // Get method for all thoughts in database
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
                .sort({ createdAt: -1 });
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single thought in database by its ID
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: "The thought with this ID does not exist"});
            }
            res.json(thought)
        } catch (err) {
            res.status(500).json(err);
        }
    }, 
    // Post method for a thought in database by a User
    async createThought(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);

            const dbUserData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true },
            );

            if (!dbUserData) {
                return res.status(404).json({ message: 'Thought saved by no user with that ID found'});
            }

            res.json({ message: 'Thought saved! '});

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Put method for a thought in database by its ID
    async updateThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'Thought with this ID does not exist.' });
            }
            res.json(dbThoughtData);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete method for a thought in database by its ID
    async deleteThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!dbThoughtData) {
                return res.status(404).json({ message: "The thought with this ID does not exist"});
            }
            // This removes the Thought ID used above from the User's Thought array
            const dbUserData = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId }, 
                { $pull: { thoughts: req.params.thoughtId } }, 
                {new : true }
                );

                if (!dbUserData) {
                    return res.status(404).json({ message: 'Can\'t find that user'});
                }
                console.log(dbThoughtData)
                res.json({ message: 'Thought deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Post method for a Reaction to a Thought in database by a User
    async addReaction(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true },
            );

            if (!dbThoughtData) {
                return res.status(404).json({ message: "The thought with this ID does not exist"});
            }

            res.json(dbThoughtData);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete method for a Reaction to a Thought in database by a User
    async deleteReaction(req, res) {
        try {
            console.log(req.params.reactionId, req.params.thoughtId)
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true },
            );

            if (!dbThoughtData) {
                return res.status(404).json({ message: "The thought with this ID does not exist"});
            }

            res.json(dbThoughtData);

        } catch (err) {
            res.status(500).json(err);
        }
    }
};