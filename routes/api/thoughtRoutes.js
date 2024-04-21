const router = require('express').Router();
const {
    getThoughts, addThought, deleteThought, updateThought, addReaction, getSingleThought, deleteReaction
    } = require('../../controllers/thoughtController');

router.route('/').get(getThoughts);

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;

// GET all thoughts
//GET single throught
// POST thought
//DELETE thouhgt