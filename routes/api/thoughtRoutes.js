const router = require('express').Router();
const {
    getThoughts, 
    createThought
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getThoughts)
.post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
//   .get(getSinglethought)
//   .put(updatethought)
//   .delete(deletethought);

// /api/thoughts/:thoughtId/reaction
// router.route('/:thoughtId/reaction').post(addReaction);

// // /api/thoughts/:thoughtId/tags/:reactionId
// router.route('/:thoughtId/tags/:reactionId').delete(removeReaction);

module.exports = router;