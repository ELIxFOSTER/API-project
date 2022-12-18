const express = require("express");
const router = express.Router();

const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const {
  User,
  Spot,
  SpotImage,
  Review,
  ReviewImage,
} = require("../../db/models");
const { check } = require("express-validator");

const {
  handleValidationErrors,
  validateSpotCreation,
} = require("../../utils/validation");











//* Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res, next) => {
  const userId = req.user.id;

  const reviews = await Review.findAll({
    where: {
      userId: userId,
    },
    include: [
      { model: User, attributes: { exclude: ['createdAt', 'updatedAt', 'hashedPassword', 'email', 'username'] } },
      { model: Spot, attributes: { exclude: ['createdAt', 'updatedAt']}},
      {
        model: ReviewImage,
        attributes: { exclude: ["createdAt", "updatedAt", "reviewId"] },
      },
    ],
  });

  res.status(200);

  res.json({
    Reviews: reviews,
  });
});

















//* Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
  const userId = req.user.id
  const { reviewId } = req.params

  const review = await Review.findByPk(reviewId)

  if (review) {
    if (review.userId !== userId) {
      const error = Error('Permission denied')
      error.status = 404
      next(error)
    } else {
      await review.destroy()
      res.status(200)
      return res.json({
        message: 'Successfulyy deleted',
        statusCode: 200
      })
    }
  } else {
    const error = Error("Review couldn't be found")
    error.status = 404
    next(error)
  }
})









const validateReviewEdit = [
  check('review')
  .exists({ checkFalsy: true })
  .withMessage('Review text is required'),
  check('stars')
  .exists({ checkFalsy: true })
  .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
]



//* Edit a Review
router.put('/:reviewId', requireAuth, validateReviewEdit, async (req, res, next) => {
  const { review, stars } = req.body
  const { reviewId } = req.params
  const userId = req.user.id

  const findReview = await Review.findByPk(reviewId)

  if (findReview) {
    if (findReview.userId !== userId) {
      const error = Error('Permission denied')
      error.status = 404
      next(error)
    } else {
      if (review) {
        findReview.review = review
        findReview.stars = stars

        findReview.save()
        res.status(200)
        return res.json(findReview)
      }
    }
  } else {
    const error = Error("Review couldn't be found")
    error.status = 404
    next(error)
  }
})














// const validateReviewImage = [
//   check('id')
//   .isNumeric({ max: 10})
//   .withMessage('Maximum number of images for this resource was reached'),
//   check('url')
//   .exists({ checkFalsy: true })
//   .withMessage('Review text required'),
//   handleValidationErrors
// ]


//* Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  const { reviewId } = req.params
  const { url } = req.body
  const userId = req.user.id

  const review = await Review.findByPk(reviewId, {
    include: [
      {
        model: ReviewImage
      }
    ]
  })


  if (review) {
    if (review.userId !== userId) {
      const error = Error('Permission denied')
      error.status = 403
      next(error)
    } else {
      if (review.ReviewImages.length === 10) {
        const error = Error('Maximum number of images for this resource was reached')
        error.status = 403
        next(error)
      } else {
        const newImage = await ReviewImage.build({
          url,
          reviewId: reviewId
        })

        await newImage.validate()
        await newImage.save()
        review.addReviewImage(newImage)

        const resObj = {}
        resObj.id = newImage.id
        resObj.url = newImage.url
        res.status(200)
        return res.json(resObj)
      }
    }
  } else {
    const error = Error("Review couldn't be found")
    error.status = 404
    next(error)
  }
})













module.exports = router;