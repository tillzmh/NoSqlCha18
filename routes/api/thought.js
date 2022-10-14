const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtsById,
    addThought,
    updateThought,
    deleteThoughts,
    addRecation,
    deleteReactions
} = require('../../controllers/thoughts-cont');

router.route('/') //set up get all thoughts at api/thoughts
.get(getAllThoughts)

router.route('/:userId') //set up post at api/thoughts/:userId
.post(addThought)

router.route('/userId/:thoughtId') // set up get, put and delete at api/thoughts/:userId/:thoughtId
.get(getThoughtsById)
.put(updateThought)
.delete(deleteThoughts)

router.route('/userId/:thoughtId/reactions/') //set up pst reaction at /api/thoughts/:userId/:thoughtId/reactions/:reactionId
.put(addRecation)

router.route('/userId/:thoughtId/reactions/:reactionID') //set up post reactionat api/userId/:thoughtId/reactions/:reactionID
.delete(deleteReactions)

module.exports = router;