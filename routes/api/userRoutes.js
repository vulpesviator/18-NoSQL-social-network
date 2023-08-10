const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require ('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

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

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;