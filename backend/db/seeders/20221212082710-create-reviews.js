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
        userId: 1,
        review: "Review 01"
      },
      {
        spotId: 5,
        userId: 1,
        review: 'Review 02'
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Review 03'
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Review 04'
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
