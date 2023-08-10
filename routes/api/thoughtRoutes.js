const router = require('express').Router();

// Imports all methods needing a path from the Thought Controller
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// Sets path to get all Thoughts and create a Thought
router.route('/').get(getThoughts).post(createThought);

// Sets path to get a single Thought, update a single Thought, and delete a single Thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// Sets path to add a Reaction to a Thought
router.route('/:thoughtId/reactions').post(addReaction);

// Sets path to remove a specific Reaction to a Thought
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;