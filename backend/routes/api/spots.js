const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
const { User, Spot, SpotImage, Review } = require("../../db/models");
const { check } = require("express-validator");
const {
  handleValidationErrors,
  validateSpotCreation,
} = require("../../utils/validation");


const validateEditedSpot = [
    check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
    check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
    check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
    // check('lat')
    //check('lng)           //! FIX THIS AND CHECK IF THESE 2 ARE NEEDED FOR `Edit a Spot` validations
    check('name')
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
    check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
    check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
    handleValidationErrors
]

// //* Get all Spots
// router.get('/', requireAuth, async (req, res, next) => {

//     let Spots = []
//     Spots = await Spot.findAll()

//     cons

//     res.status(400)
//     res.json({
//         Spots: spots
//     })

// })

// //* Get all Spots owned by the Current User
// router.get('/current', requireAuth, async (req, res, next) => {
//     const { id } = req.user

// })

//* Add an Image to a Spot
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { spotId } = req.params
    const { url, preview } = req.body
    const ownerId  = req.user.id


    const spot = await Spot.findByPk(spotId,{
        include: [
            { model: SpotImage }
        ]
    })

    if (spot) {
      if (spot.ownerId !== ownerId) {
        const error = Error('Forbidden')
        error.status = 403
        next(error)
      }
        const newImage = await SpotImage.build({
            url,
            preview
        })

        await newImage.validate()
        await newImage.save()
        spot.addSpotImage(newImage)

        const resObj = {}
        resObj.id = newImage.id
        resObj.url = newImage.url
        resObj.preview = newImage.preview

        res.status(200)
        return res.json(resObj)
    } else {
        const error = Error("Spot couldn't be found")
        error.status = 404
        next(error)
    }

})

//* Edit a Spot
router.put('/:spotId', requireAuth, validateEditedSpot, async (req, res, next) => {
    const { spotId } = req.params
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const ownerId = req.user.id


    const spot = await Spot.findByPk(spotId)

    if (spot) {
      if (spot.ownerId !== ownerId) {
        const error = Error('Permission denied')
        error.status = 404
        next(error)
      } else {
        spot.address = address
        spot.city = city
        spot.state = state
        spot.country = country
        spot.lat = lat
        spot.lng = lng
        spot.name = name
        spot.description = description
        spot.price = price

        spot.save()
        res.status(200)
        return res.json(spot)
      }
    } else {
        const error = Error("Spot couldn't be found")
        error.status = 404
        next(error)
    }
})

//? Get details of a Spot from an id
router.get("/:spotId", async (req, res, next) => {
  const { spotId } = req.params;

  const spotDetails = await Spot.findByPk(spotId, {
    include: [
      {
        model: SpotImage,
        attributes: { exclude: ["createdAt", "updatedAt", "spotId"] },
      },
      { model: User, as: "Owner", attributes: ["id", "firstName", "lastName"] },
    ],
  });

  if (!spotDetails) {
    const error = Error("Spot couldn't be found");
    error.status = 404;
    next(error);
  } else {
    res.status(200);
    res.json(spotDetails);
  }
});


//* Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const { spotId } = req.params
    const ownerId = req.user.id

    const spot = await Spot.findByPk(spotId)

    if (spot) {
      if (spot.ownerId !== ownerId) {
        const error = Error("Permission denied")
        error.status = 404
        next(error)
      } else {
        await spot.destroy()
        res.status(200)
        return res.json({
            message: 'Successfully deleted',
            statusCode: 200
        })
      }
    } else {
        const error = Error("Spot couldn't be found")
        error.status = 404
        next(error)
    }
})

//* Create a Spot #14
router.post("/", requireAuth, validateSpotCreation, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const { id } = req.user;

  const newSpot = await Spot.build({
    address,
    ownerId: id,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  await newSpot.validate();
  await newSpot.save();

  res.status(201);
  res.json(newSpot);
});










const validateReview = [
  check('review')
  .exists({ checkFalsy: true })
  .withMessage('Review test is required'),
  check('stars')
  .exists({ checkFalsy: true })
  .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
]
//* Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
  const { spotId } = req.params
  const { review, stars } = req.body
  const userId = req.user.id


  const spot = await Spot.findByPk(spotId, {
    include: [
      { model: Review }
    ]
  })

  if (spot) {
    spot.Reviews.forEach((review) => {
      if (review.userId === userId) {
        const error = Error('User already has a review for this spot')
        error.status = 403
        next(error)
        return
      }
    })
    const newReview = await Review.build({
      review,
      stars,
      userId,
      spotId: spot.id
    })

    await newReview.validate()
    await newReview.save()
    spot.addReview(newReview)

    res.status(200)
    return res.json(newReview)
  } else {
    const error = Error("Spot couldn't be found")
    error.status = 404
    next(error)
  }

})

module.exports = router;
