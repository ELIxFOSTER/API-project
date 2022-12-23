const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Review, ReviewImage } = require("../../db/models");

//* Delete a Review Image
router.delete("/:imageId", requireAuth, async (req, res, next) => {
const { imageId } = req.params
const userId = req.user.id

const reviewImage = await ReviewImage.findByPk(imageId)

if (!reviewImage) {
  const error = Error("Review Image couldn't be found")
  error.status = 404
  next(error)
}
const review = await Review.findByPk(reviewImage.reviewId)

if (review.userId !== userId) {
  const error = Error('Forbidden')
  error.status = 403
  next(error)
} else {
  await reviewImage.destroy()
  res.status(200)
  return res.json({
    message: 'Successfully deleted',
    statusCode: 200
  })
}

});

module.exports = router;
