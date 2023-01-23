'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review: "The place is beautiful and the indoor pool area was outstanding.",
        stars: 4.5
      },
      {
        spotId: 1,
        userId: 3,
        review: "Nice quite location, very nice",
        stars: 4.5
      },
      {
        spotId: 2,
        userId: 3,
        review: "Audrey did a fantastic job at answering any questions I had before and during our stay. ",
        stars: 5
      },
      {
        spotId: 2,
        userId: 1,
        review: 'Review 02',
        stars: 1
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Review 03',
        stars: 4
      },
      {
        spotId: 3,
        userId: 1,
        review: 'Review 04',
        stars: 4.5
      },
      {
        spotId: 4,
        userId: 2,
        review: 'Review 05',
        stars: 5
      },
      {
        spotId: 4,
        userId: 1,
        review: 'Review 05',
        stars: 5
      },
      {
        spotId: 4,
        userId: 3,
        review: 'Review 05',
        stars: 5
      },
      {
        spotId: 5,
        userId: 1,
        review: 'Review 05',
        stars: 4
      },
      {
        spotId: 5,
        userId: 2,
        review: 'Review 05',
        stars: 2
      },
      {
        spotId: 5,
        userId: 3,
        review: 'Review 05',
        stars: 1.1
      },
      {
        spotId: 6,
        userId: 1,
        review: 'Review 05',
        stars: 4.3
      },
      {
        spotId: 6,
        userId: 2,
        review: 'Review 05',
        stars: 5
      },
      {
        spotId: 7,
        userId: 2,
        review: 'Review 05',
        stars: 5
      },
      {
        spotId: 7,
        userId: 3,
        review: 'Review 05',
        stars: 5
      },
      {
        spotId: 8,
        userId: 2,
        review: 'Review 05',
        stars: 4.5
      },
      {
        spotId: 9,
        userId: 1,
        review: 'Review 05',
        stars: 4.9
      },
      {
        spotId: 9,
        userId: 2,
        review: 'Review 05',
        stars: 5
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['Review 01', 'Review 02', 'Review 03', 'Review 04']}
    }, {});
  }
};
