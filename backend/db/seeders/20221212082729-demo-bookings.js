'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: '2023-01-01',
        endDate: '2023-01-20',
      },
      {
        spotId: 1,
        userId: 2,
        startDate: '2023-02-01',
        endDate: '2023-02-20',
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2023-03-01',
        endDate: '2023-04-01',
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2023-01-01',
        endDate: '2023-02-01',
      },
      {
        spotId: 4,
        userId: 1,
        startDate: '2023-10-01',
        endDate: '2023-10-20',
      },
      {
        spotId: 5,
        userId: 2,
        startDate: '2023-06-01',
        endDate: '2023-06-20'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [ 1, 2, 3]}
    }, {});
  }
};
