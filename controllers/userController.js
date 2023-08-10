const { User, Thought } = require('../models');

module.exports = {

    async getUsers(req, res) {
       try {
        const users = await User.find()
            .select('-__v');
        res.json(users);
       } catch (err) {
        res.status(500).json(err)
       }
    },

    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts');
        
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID exists' });
        }

        res.json(user);
      } catch (err) {
        res.status(500).json(err)
      }
    },

    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async updateUser(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                {
                    $set: req.body,
                },
                {
                    runValidators: true,
                    new: true,
                }
            );

            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with that ID exists' });
            }

            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });

            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with that ID exists' });
            }

            await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });

            res.json({ message: 'This user and their thoughts have been deleted.' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );

            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with that ID exists' });
            }

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );

            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with that ID exists' });
            }

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

