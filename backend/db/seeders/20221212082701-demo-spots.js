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
        address: 'Spot 1',
        city: 'California',
        state: 'EX',
        country: 'US',
        lat: 11.05001,
        lng: 22.05001,
        name: 'First Spot',
        description: "Experience excitement, luxury and relaxation in Ohio's ultimate vacation home! Featuring endless outdoor and indoor activities for all ages, this stunning home truly has it all!",
        price: 111
      },
      {
        ownerId: 2,
        address: 'Spot 2',
        city: "Florida",
        state: "EX",
        country: "US",
        lat: 33.05001,
        lng: 44.00501,
        name: 'Second Spot',
        description: 'Wonderful spot desc. #2',
        price: 222
      },
      {
        ownerId: 3,
        address: "Spot 3",
        city: "Utah",
        state: "EX",
        country: "US",
        lat: 55.50001,
        lng: 66.00501,
        name: 'Third Spot',
        description: 'Fantastic spot desc. #3',
        price: 333
      },
      {
        ownerId: 1,
        address: "Spot 4",
        city: "Florida",
        state: "EX",
        country: "US",
        lat: 77.01001,
        lng: 88.01001,
        name: 'Fourth Spot',
        description: "Great spot desc. #4",
        price: 444
      },
      {
        ownerId: 1,
        address: "Spot 5",
        city: "Texas",
        state: "EX",
        country: "US",
        lat: 99.00501,
        lng: 11.00101,
        name: "Fifth Spot",
        description: "Last but not least desc. #5",
        price: 555
      },
      {
        ownerId: 3,
        address: "Spot 6",
        city: "Mexico",
        state: "MX",
        country: "US",
        lat: 43.00601,
        lng: 43.02001,
        name: "Sixth Spot",
        description: "Last but not least desc. #6",
        price: 1000
      },
      {
        ownerId: 3,
        address: "Spot 7",
        city: "Mexico",
        state: "MX",
        country: "US",
        lat: 43.06001,
        lng: 43.0002251,
        name: "Seventh Spot",
        description: "Last but not least desc. #6",
        price: 1000
      },
      {
        ownerId: 3,
        address: "Spot 8",
        city: "Mexico",
        state: "MX",
        country: "US",
        lat: 43.02001,
        lng: 43.00201,
        name: "Eighth Spot",
        description: "Last but not least desc. #6",
        price: 1000
      },
      {
        ownerId: 3,
        address: "Spot 9",
        city: "Mexico",
        state: "MX",
        country: "US",
        lat: 43.02001,
        lng: 43.00201,
        name: "Ninth Spot",
        description: "Last but not least desc. #6",
        price: 1000
      },
      {
        ownerId: 3,
        address: "Spot 10",
        city: "Mexico",
        state: "MX",
        country: "US",
        lat: 43.2001,
        lng: 43.00021,
        name: "Tenth Spot",
        description: "Last but not least desc. #6",
        price: 1000
      },
      {
        ownerId: 3,
        address: "Spot 11",
        city: "Mexico",
        state: "MX",
        country: "US",
        lat: 43.00601,
        lng: 43.05001,
        name: "Eleventh Spot",
        description: "Last but not least desc. #6",
        price: 1000
      },
      {
        ownerId: 3,
        address: "Spot 12",
        city: "Mexico",
        state: "MX",
        country: "US",
        lat: 43.006201,
        lng: 43.5260001,
        name: "Twelfth Spot ",
        description: "Last but not least desc. #6",
        price: 1000
      },
      {
        ownerId: 3,
        address: "Spot 13",
        city: "Mexico",
        state: "MX",
        country: "US",
        lat: 43.004201,
        lng: 43.0054201,
        name: "Thirteenth Spot",
        description: "Last but not least desc. #6",
        price: 1000
      },
      {
        ownerId: 3,
        address: "Spot 14",
        city: "Mexico",
        state: "MX",
        country: "US",
        lat: 43.0053201,
        lng: 43.0532001,
        name: "Fourteenth Spot",
        description: "Last but not least desc. #6",
        price: 1000
      },
      {
        ownerId: 3,
        address: "Spot 15",
        city: "Mexico",
        state: "MX",
        country: "US",
        lat: 43.525,
        lng: 43.014001,
        name: "Fifteenth Spot",
        description: "Last but not least desc. #6",
        price: 1000
      },
      {
        ownerId: 3,
        address: "Spot 16",
        city: "Mexico",
        state: "MX",
        country: "US",
        lat: 43.010201,
        lng: 43.00201,
        name: "Sixteenth Spot",
        description: "Last but not least desc. #6",
        price: 1000
      },
      {
        ownerId: 3,
        address: "Spot 17",
        city: "Mexico",
        state: "MX",
        country: "US",
        lat: 43.50001,
        lng: 43.00601,
        name: "Seventeenth Spot",
        description: "Last but not least desc. #6",
        price: 1000
      },
      {
        ownerId: 3,
        address: "Spot 18",
        city: "Mexico",
        state: "MX",
        country: "US",
        lat: 43.00201,
        lng: 43.00201,
        name: "Eighteenth Spot",
        description: "Last but not least desc. #6",
        price: 1000
      },
      {
        ownerId: 3,
        address: "Spot 19",
        city: "Mexico",
        state: "MX",
        country: "US",
        lat: 43.00401,
        lng: 43.00501,
        name: "Nineteenth Spot",
        description: "Last but not least desc. #6",
        price: 1000
      },
      {
        ownerId: 3,
        address: "Spot 20",
        city: "Mexico",
        state: "MX",
        country: "US",
        lat: 413.0001,
        lng: 433.0001,
        name: "Twentieth Spot",
        description: "Last but not least desc. #6",
        price: 1000
      },

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
