const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughts-cont');

router.route('/') //set up get all thoughts at api/thoughts
.get(getAllThoughts)

router.route('/:userId') //set up post at api/thoughts/:userId
.post(addThought)

router.route('/userId/:thoughtId') // set up get, put and delete at api/thoughts/:userId/:thoughtId
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought)

router.route('/userId/:thoughtId/reactions/:reactionID') //set up post reactionat api/userId/:thoughtId/reactions/:reactionID
.delete(deleteReaction)

router.route('/userId/:thoughtId/reactions/') //set up pst reaction at /api/thoughts/:userId/:thoughtId/reactions/:reactionId
.put(addReaction)


module.exports = router;