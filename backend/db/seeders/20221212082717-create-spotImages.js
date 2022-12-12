'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'www.example1.com',
        preview: true
      },
      {
        spotId: 1,
        url: 'www.example1ext.com',
        preview: false
      },
      {
        spotId: 2,
        url: 'www.example2.com',
        preview: false
      },
      {
        spotId: 3,
        url: 'www.example3.com',
        preview: false
      },
      {
        spotId: 4,
        url: 'www.example4.com',
        preview: false
      },
      {
        spotId: 5,
        url: 'www.example5.com',
        preview: false
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['www.example1.com', 'www.example1ext.com', 'www.example3.com', 'www.example4.com', 'www.example5.com']}
    }, {});
  }
};
