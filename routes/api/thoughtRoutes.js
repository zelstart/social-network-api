const router = require('express').Router();
const {
    getThoughts, 
    createThought,
    getSingleThought,
    updateThought
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getThoughts)
.post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
//   .delete(deletethought);

// /api/thoughts/:thoughtId/reaction
// router.route('/:thoughtId/reaction').post(addReaction);

// // /api/thoughts/:thoughtId/reactions/:reactionId
// router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;