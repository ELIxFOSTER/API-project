const express = require("express");
const router = express.Router();

const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const { Spot, SpotImage, Booking } = require("../../db/models");
const { check } = require("express-validator");
const { Op } = require("sequelize");
const { handleValidationErrors } = require("../../utils/validation");

const validateBooking = [
  check("endDate").custom((value, { req }) => {
    if (value <= req.body.startDate) {
      throw new Error("endDate cannot be on or before startDate");
    }
  }),
  handleValidationErrors,
];

// //* Edit a Booking
router.put("/:bookingId", requireAuth, async (req, res, next) => {
  const { bookingId } = req.params;
  const { startDate, endDate } = req.body;
  const userId = req.user.id;

  const booking = await Booking.findByPk(bookingId);

  if (!booking) {
    const error = Error("Booking couldn't be found");
    error.status = 404;
    return next(error);
  }

  if (endDate <= startDate) {
    const error = Error("Validation Error");
    error.status = 400;
    error.errors = {
      endDate: "endDate cannot be on or before startDate",
    };
    return next(error);
  }

  if (userId !== booking.userId) {
    const error = Error("Forbidden");
    error.status = 403;
    return next(error);
  }

  if (!booking) {
    const error = Error("Booking couldn't be found");
    error.status = 404;
    return next(error);
  }

  if (new Date().getTime() > booking.endDate.getTime()) {
    const error = Error("Past bookings can't be modified");
    error.status = 403;
    return next(error);
  }

  const spot = await Spot.findByPk(booking.spotId);

  const allBookings = await Booking.findAll({
    where: {
      spotId: spot.id,
    },
  });

  let flag = false;

  for (let i = 0; i < allBookings.length; i++) {
    let jsonBooking = allBookings[i].toJSON();

    if (new Date(jsonBooking.startDate).getTime() === new Date(startDate).getTime()) {
      flag = true;
      const error = Error(
        "Sorry, this spot is already booked for the specific dates"
      );
      error.status = 403;
      error.errors = {
        startDate: "Start date conflicts with an exists booking",
      };
      return next(error);
    }

    if (
      new Date(startDate).getTime() < new Date(jsonBooking.endDate).getTime() &&
      new Date(startDate).getTime() > new Date(jsonBooking.startDate).getTime()
    ) {
      flag = true;
      const error = Error(
        "Sorry, this spot is already booked for the specific dates"
      );
      error.status = 403;
      error.errors = {
        startDate: "Start date conflicts with an exists booking",
      };
      return next(error);
    }

    if (
      new Date(startDate).getTime() ===
      new Date(jsonBooking.startDate).getTime()
    ) {
      flag = true;
      const error = Error(
        "Sorry, this spot is already booked for the specific dates"
      );
      error.status = 403;
      error.errors = {
        startDate: "Start date conflicts with an existing booking",
      };
      return next(error);
    }

    if (
      new Date(startDate).getTime() === new Date(jsonBooking.endDate).getTime()
    ) {
      flag = true;
      const error = Error(
        "Sorry, this spot is already booked for the specific dates"
      );
      error.status = 403;
      error.errors = {
        startDate: "Start date conflicts with an existing booking",
      };
      return next(error);
    }
    if (
      new Date(jsonBooking.endDate).getTime() < new Date().getTime() ||
      new Date(jsonBooking.startDate).getTime() < new Date().getTime()
    ) {
      const error = Error("Dates cannot be changed to the past");
      error.status = 403;
      return next(error);
    }
  }

  if (flag === false) {
    const editedBooking = await booking.set({
      startDate,
      endDate,
    });

    await editedBooking.save();

    res.status(200);
    console.log(editedBooking);
    return res.json(editedBooking);
  } else {
    return;
  }
});

//* Get all of the Current User's Bookings
router.get("/current", requireAuth, async (req, res, next) => {
  const userId = req.user.id;

  const bookings = await Booking.findAll({
    where: {
      userId,
    },
    include: [
      {
        model: Spot,
        attributes: { exclude: ["createdAt", "updatedAt", "description"] },
      },
    ],
  });

  let answer = [];
  for (let each of bookings) {
    const booking = each.toJSON();
    let eachObj = {};

    let previewImage = await SpotImage.findAll({
      where: {
        [Op.and]: [{ spotId: booking.spotId }, { preview: true }],
      },
      raw: true,
    });

    eachObj.id = booking.id;
    eachObj.spotId = booking.spotId;
    eachObj.Spot = booking.Spot;
    if (previewImage[0]) {
      eachObj.Spot.previewImage = previewImage[0].url;
    } else {
      eachObj.Spot.previewImage = "No preview image url";
    }
    eachObj.userId = booking.userId;
    eachObj.startDate = booking.startDate;
    eachObj.endDate = booking.endDate;
    eachObj.createdAt = booking.createdAt;
    eachObj.updatedAt = booking.updatedAt;
    answer.push(eachObj);
  }
  res.status(200);
  return res.json({
    Bookings: answer,
  });
});

//* Delete a Booking
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const { bookingId } = req.params;
  const userId = req.user.id;

  const booking = await Booking.findByPk(bookingId);

  if (booking) {
    const spot = await Spot.findByPk(booking.spotId);
    if (booking.startDate < new Date()) {
      const error = Error("Bookings that have been started can't be deleted");
      error.status = 403;
      return next(error);
    }

    if (booking.userId === userId || userId === spot.ownerId) {
      await booking.destroy();
      res.status(200);
      return res.json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    } else {
      const error = Error("Forbidden");
      error.status = 403;
      return next(error);
    }
  } else {
    const error = Error("Booking couldn't be found");
    error.status = 404;
    return next(error);
  }
});

module.exports = router;
