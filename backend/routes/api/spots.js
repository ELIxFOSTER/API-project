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
  sequelize,
  Review,
  Booking,
  ReviewImage,
} = require("../../db/models");
const { check } = require("express-validator");
const {
  handleValidationErrors,
  validateSpotCreation,
} = require("../../utils/validation");
const { get } = require("./bookings");
const spot = require("../../db/models/spot");
const { InstanceError } = require("sequelize");

const validateEditedSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  // check('lat')
  //check('lng)           //! FIX THIS AND CHECK IF THESE 2 ARE NEEDED FOR `Edit a Spot` validations
  check("name")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

const validateBooking = [
  check("endDate").custom((value, { req }) => {
    if (new Date(value).getTime() <= new Date(req.body.startDate).getTime()) {
      throw new Error("endDate cannot be on or before startDate");
    }
  }),
  check("startDate").isDate().withMessage("Nope"),
  handleValidationErrors,
];

//* Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const { startDate, endDate } = req.body;

  const findSpot = await Spot.findByPk(spotId);

  if (!findSpot) {
    const error = Error("Spot couldn't be found");
    error.status = 404;
    next(error);
  }

  if (findSpot.ownerId === req.user.id) {
    const error = Error("Forbidden");
    error.status = 403;
    next(error);
  }

  const allBookings = await Booking.findAll({
    where: {
      spotId,
    },
  });

  for (let i = 0; i < allBookings.length; i++) {
    let jsonBooking = allBookings[i].toJSON();

    if (jsonBooking.startDate === startDate) {
      const error = Error(
        "Sorry, this spot is already booked for the specific dates"
      );
      error.status = 403;
      error.errors = {
        startDate: "Start date conflicts with an exists booking",
      };
      next(error)
    }

    if (
      new Date(startDate).getTime() < new Date(jsonBooking.endDate).getTime() &&
      new Date(startDate).getTime() > new Date(jsonBooking.startDate).getTime()
    ) {
      const error = Error(
        "Sorry, this spot is already booked for the specific dates"
      );
      error.status = 403;
      error.errors = {
        startDate: "Start date conflicts with an exists booking",
      };
      next(error)
    }

    if (
      new Date(startDate).getTime() ===
      new Date(jsonBooking.startDate).getTime()
    ) {
      const error = Error(
        "Sorry, this spot is already booked for the specific dates"
      );
      error.status = 403;
      error.errors = {
        startDate: "Start date conflicts with an existing booking",
      };
      next(error);
    }

    if (
      new Date(startDate).getTime() === new Date(jsonBooking.endDate).getTime()
    ) {
      const error = Error(
        "Sorry, this spot is already booked for the specific dates"
      );
      error.status = 403;
      error.errors = {
        startDate: "Start date conflicts with an existing booking",
      };
      next(error);
    }
  }

  const newBooking = await Booking.build({
    spotId: spotId,
    userId: req.user.id,
    startDate: startDate,
    endDate: endDate,
  });

  await newBooking.validate();
  await newBooking.save();

  res.status(200);
  return res.json(newBooking);
});

//* Add an Image to a Spot
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;
  const ownerId = req.user.id;

  const spot = await Spot.findByPk(spotId, {
    include: [{ model: SpotImage }],
  });

  if (spot) {
    if (spot.ownerId !== ownerId) {
      const error = Error("Forbidden");
      error.status = 403;
      next(error);
    }
    const newImage = await SpotImage.build({
      url,
      preview,
    });

    await newImage.validate();
    await newImage.save();
    spot.addSpotImage(newImage);

    const resObj = {};
    resObj.id = newImage.id;
    resObj.url = newImage.url;
    resObj.preview = newImage.preview;

    res.status(200);
    return res.json(resObj);
  } else {
    const error = Error("Spot couldn't be found");
    error.status = 404;
    next(error);
  }
});

//* Edit a Spot
router.put(
  "/:spotId",
  requireAuth,
  validateEditedSpot,
  async (req, res, next) => {
    const { spotId } = req.params;
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;
    const ownerId = req.user.id;

    const spot = await Spot.findByPk(spotId);

    if (spot) {
      if (spot.ownerId !== ownerId) {
        const error = Error("Permission denied");
        error.status = 404;
        next(error);
      } else {
        spot.address = address;
        spot.city = city;
        spot.state = state;
        spot.country = country;
        spot.lat = lat;
        spot.lng = lng;
        spot.name = name;
        spot.description = description;
        spot.price = price;

        spot.save();
        res.status(200);
        return res.json(spot);
      }
    } else {
      const error = Error("Spot couldn't be found");
      error.status = 404;
      next(error);
    }
  }
);

//* Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res, next) => {
  const userId = req.user.id;

  const spots = await Spot.findAll({
    where: {
      ownerId: userId,
    },
    raw: true,
  });

  for (let i = 0; i < spots.length; i++) {
    const spotImage = await SpotImage.findOne({
      where: {
        spotId: spots[i].id,
      },
    });

    console.log("XXXXX", spotImage);

    if (spotImage) {
      spots[i].previewImage = spotImage.url;
    } else {
      spots[i].previeImage = "No preview image url set";
    }

    const review = await Review.findAll({
      where: {
        spotId: spots[i].id,
      },
      attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
      raw: true,
    });

    if (parseFloat(review[0].avgRating).toFixed(1) === "NaN") {
      spots[i].avgRating = "No ratings yet";
    } else {
      spots[i].avgRating = parseFloat(review[0].avgRating).toFixed(1);
    }
  }

  res.status(200);
  return res.json({
    Spots: spots,
  });
});

//* Get details of a Spot from an id
router.get("/:spotId", async (req, res, next) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId, {
    raw: true,
  });

  const spotDetails = await Spot.findByPk(spotId, {
    include: [
      {
        model: SpotImage,
        attributes: { exclude: ["createdAt", "updatedAt", "spotId"] },
      },
      { model: User, as: "Owner", attributes: ["id", "firstName", "lastName"] },
    ],
  });

  const reviewCount = await Review.count({
    where: {
      spotId: spotId,
    },
  });

  spot.numReviews = reviewCount;

  const reviews = await Review.findAll({
    where: {
      spotId: spotId,
    },
    attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
    raw: true,
  });

  for (let i = 0; i < reviews.length; i++) {
    if (parseFloat(reviews[0].avgRating).toFixed(1) === "NaN") {
      spot.avgRating = "No ratings yet";
    } else {
      spot.avgRating = parseFloat(reviews[0].avgRating).toFixed(1);
    }
  }

  if (!spotDetails) {
    const error = Error("Spot couldn't be found");
    error.status = 404;
    next(error);
  } else {
    spot.Owner = spotDetails.Owner;
    spot.SpotImages = spotDetails.SpotImages;

    res.status(200);
    res.json(spot);
  }
});

//* Delete a Spot
router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const ownerId = req.user.id;

  const spot = await Spot.findByPk(spotId);

  if (spot) {
    if (spot.ownerId !== ownerId) {
      const error = Error("Permission denied");
      error.status = 404;
      next(error);
    } else {
      await spot.destroy();
      res.status(200);
      return res.json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    }
  } else {
    const error = Error("Spot couldn't be found");
    error.status = 404;
    next(error);
  }
});

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
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review test is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

//* Create a Review for a Spot based on the Spot's id
router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReview,
  async (req, res, next) => {
    const { spotId } = req.params;
    const { review, stars } = req.body;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId, {
      include: [{ model: Review }],
    });

    if (spot) {
      spot.Reviews.forEach((review) => {
        if (review.userId === userId) {
          const error = Error("User already has a review for this spot");
          error.status = 403;
          next(error);
          return;
        }
      });
      const newReview = await Review.build({
        review,
        stars,
        userId,
        spotId: spot.id,
      });

      await newReview.validate();
      await newReview.save();
      spot.addReview(newReview);

      res.status(200);
      return res.json(newReview);
    } else {
      const error = Error("Spot couldn't be found");
      error.status = 404;
      next(error);
    }
  }
);

//* Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res, next) => {
  const { spotId } = req.params;

  const findSpot = await Spot.findByPk(spotId);

  const reviews = await Review.findAll({
    where: {
      spotId,
    },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: ReviewImage, attributes: ["id", "url"] },
    ],
  });

  if (!findSpot) {
    const error = Error("Spot couldn't be found");
    error.status = 404;
    next(error);
    return;
  } else {
    res.status(200);
    return res.json({
      Reviews: reviews,
    });
  }
});

//* Get all Bookings for a Spot based on Spot's id
router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const userId = req.user.id;

  const verifySpot = await Spot.findByPk(spotId);

  if (!verifySpot) {
    const error = Error("Spot couldn't be found");
    error.status = 404;
    next(error);
  }

  let Bookings = [];

  Bookings = await Booking.findAll({
    include: [{ model: User, attributes: ["id", "firstName", "lastName"] }],
    where: {
      spotId,
    },
  });

  let filteredBookings = [];

  for (let booking of Bookings) {
    console.log("bookingId", booking.userId);
    console.log("userId", userId);

    if (booking.userId === userId) {
      filteredBookings.push(booking);
    } else {
      const filtered = await Booking.findOne({
        where: {
          id: booking.id,
        },
        attributes: ["spotId", "startDate", "endDate"],
      });

      filteredBookings.push(filtered);
    }
  }

  res.status(200);
  return res.json({
    Bookings: filteredBookings,
  });
});

const validateQueryParams = [
  check("page")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage("Page must be greater than or equal to 1"),
  check("size")
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage("Size must be greater than or equal to 1"),
  check("maxLat")
    .optional()
    .isDecimal()
    .withMessage("Maximum latitude is invalid"),
  check("minLat")
    .optional()
    .isDecimal()
    .withMessage("Minimum latitude is invalid"),
  check("minLng")
    .optional()
    .isDecimal()
    .withMessage("Minimum longitude is invalid"),
  check("maxLng")
    .optional()
    .isDecimal()
    .withMessage("Maximum longitude is invalid"),
  check("minPrice")
    .optional()
    .isDecimal({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  check("maxPrice")
    .optional()
    .isDecimal({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors,
];

function createPaginationObject(req, res, next) {
  let { page, size } = req.query;

  let defaultSize = 20;
  let defaultPage = 1;

  if (!page || page <= 1 || isNaN(page)) {
    page = defaultPage;
  }

  if (!size || size <= 1 || isNaN(size)) {
    size = defaultSize;
  }

  if (size > 20) {
    size = 20;
  }

  let pagination = {};
  pagination.limit = size;
  pagination.offset = (page - 1) * size;

  req.pagination = pagination;
  req.page = page;
  req.size = size;
  next();
}

//* Get All Spots
router.get(
  "/",
  validateQueryParams,
  createPaginationObject,
  async (req, res, next) => {
    const spots = await Spot.findAll({
      ...req.pagination,
      raw: true,
    });

    for (let i = 0; i < spots.length; i++) {
      const spotImage = await SpotImage.findOne({
        where: {
          spotId: spots[i].id,
        },
      });

      if (spotImage) {
        spots[i].previewImage = spotImage.url;
      } else {
        spots[i].previewImage = "No preview Image set yet";
      }

      const review = await Review.findAll({
        where: {
          spotId: spots[i].id,
        },
        attributes: [
          [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
        ],
        raw: true,
      });

      if (parseFloat(review[0].avgRating).toFixed(1) === "NaN") {
        spots[i].avgRating = "No ratings yet";
      } else {
        spots[i].avgRating = parseFloat(review[0].avgRating).toFixed(1);
      }
    }

    res.status(200);
    return res.json({
      Spots: spots,
      page: parseInt(req.page),
      size: parseInt(req.size),
    });
  }
);

module.exports = router;
