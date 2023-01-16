'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '1111 Example St',
        city: 'California',
        state: 'EX',
        country: 'US',
        lat: 11.0001,
        lng: 22.0001,
        name: 'First Spot',
        description: "Amazing spot desc. #1",
        price: 111
      },
      {
        ownerId: 2,
        address: '2222 Example Rd',
        city: "Florida",
        state: "EX",
        country: "US",
        lat: 33.0001,
        lng: 44.0001,
        name: 'Second Spot',
        description: 'Wonderful spot desc. #2',
        price: 222
      },
      {
        ownerId: 3,
        address: "3333 Example Ave",
        city: "Utah",
        state: "EX",
        country: "US",
        lat: 55.0001,
        lng: 66.0001,
        name: 'Third Spot',
        description: 'Fantastic spot desc. #3',
        price: 333
      },
      {
        ownerId: 1,
        address: "4444 Example Ln",
        city: "Florida",
        state: "EX",
        country: "US",
        lat: 77.0001,
        lng: 88.0001,
        name: 'Fourth Spot',
        description: "Great spot desc. #4",
        price: 444
      },
      {
        ownerId: 1,
        address: "5555 Example St",
        city: "Texas",
        state: "EX",
        country: "US",
        lat: 99.0001,
        lng: 11.0001,
        name: "Fifth Spot",
        description: "Last but not least desc. #5",
        price: 555
      },
      {
        ownerId: 3,
        address: "666 Example St",
        city: "Mexico",
        state: "MX",
        country: "US",
        lat: 43.0001,
        lng: 43.0001,
        name: "Sixth Spot",
        description: "Last but not least desc. #6",
        price: 1000
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      // username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
      name: { [Op.in]: ['First Spot', 'Second Spot', 'Third Spot', 'Fourth Spot', 'Fifth Spot']}
    }, {});
  }
};
