const router = require('express').Router();

// Imports all methods needing a path from the User Controller
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require ('../../controllers/userController');

// Sets path to get all Users and create a new User
router.route('/').get(getUsers).post(createUser);

// Sets path to get a single User, update a single User, and delete a single User
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// This allows the Thoughts associated to a specifc User to be deleted when that User is removed
router.route('/:userId').delete(async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID exists' });
        }

        await user.remove();

        res.json({ message: "User and their thoughts have been removed" });
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// Sets path to add and remove a Friend to a User by the Friend's ID 
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;