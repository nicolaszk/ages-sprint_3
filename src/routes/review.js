
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/:slug', reviewController.createReview);
router.get('/', reviewController.getReviews);
router.get('/:slug', reviewController.getReviewsByMovie);
router.put('/:id', reviewController.updateReview);
router.patch('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;

