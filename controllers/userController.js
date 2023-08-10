const { User, Thought } = require('../models');

module.exports = {
    // Get method for all Users in database
    async getUsers(req, res) {
       try {
        const users = await User.find()
            .select('-__v');
        res.json(users);
       } catch (err) {
        res.status(500).json(err)
       }
    },
    // Get a single User and associated Thoughts and Friends in database by their ID
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
    // Post method to create a User in database
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // Put method to update a User in database by their ID
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
    // Delete method to remove a User in database by their ID
    async deleteUser(req, res) {
        try {
            const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });

            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with that ID exists' });
            }
            // Allows all Thoughts associated with the User ID entered to also be deleted
            await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });

            res.json({ message: 'This user and their thoughts have been deleted.' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Post method for a User to be added as a Friend in database by another User
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
    // Delete method for a User to remove a Friend in the database by a User
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

