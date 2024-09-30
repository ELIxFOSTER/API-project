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
        city: 'Cabo',
        state: 'Baja California Sur',
        country: 'Mexico',
        lat: 11.05001,
        lng: 22.05001,
        name: 'The Coolest + Most Beautiful House in Cabo + Most Delish!',
        description: "Experience excitement, luxury and relaxation in this locations ultimate vacation home!",
        price: 3124
      },
      {
        ownerId: 2,
        address: 'Spot 2',
        city: "George Town",
        state: "Exuma",
        country: "Bahamas",
        lat: 33.05001,
        lng: 44.00501,
        name: 'Emerald Escape Vacation Home',
        description: 'Relax and enjoy the views with family and friends!',
        price: 1500
      },
      {
        ownerId: 1,
        address: "Spot 4",
        city: "Michelson",
        state: "Exuma",
        country: "Bahamas",
        lat: 77.01001,
        lng: 88.01001,
        name: 'Luxury CH Villa☼ Beachfront ☼ Kayak ☼ Pool☼ 10 ppl',
        description: "Waterfront Villa at the tropic of cancer beach, Georgetown Exumas. ",
        price: 1250
      },
      {
        ownerId: 3,
        address: "Spot 8",
        city: "Playa Flamingo",
        state: "Guanacaste",
        country: "Costa Rica",
        lat: 43.02001,
        lng: 43.00201,
        name: "Luxurious Casa Symbiotica - sleeps 19 guests!",
        description: "High end resort-like home in mountaintop community with 180 degree views of the Pacific Ocean. ",
        price: 2485
      },
      {
        ownerId: 3,
        address: "Spot 9",
        city: "Miami",
        state: "Florida",
        country: "United States",
        lat: 43.02001,
        lng: 43.00201,
        name: "Villa sleeps 16, Movie theater, Pool, & Jacuzzi !",
        description: "Our Villa Justina is a one of a kind , combining Tudor architecture with modern elements.",
        price: 1810
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
      // {
      //   ownerId: 3,
      //   address: "Spot 19",
      //   city: "Mexico",
      //   state: "MX",
      //   country: "US",
      //   lat: 43.00401,
      //   lng: 43.00501,
      //   name: "Nineteenth Spot",
      //   description: "Last but not least desc. #6",
      //   price: 1000
      // },
      // {
      //   ownerId: 3,
      //   address: "Spot 20",
      //   city: "Mexico",
      //   state: "MX",
      //   country: "US",
      //   lat: 413.0001,
      //   lng: 433.0001,
      //   name: "Twentieth Spot",
      //   description: "Last but not least desc. #6",
      //   price: 1000
      // },

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
