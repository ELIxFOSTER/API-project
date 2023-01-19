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
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48538355/original/a8c52a64-23d1-4cf7-96dc-f28f8edc984d.jpeg?im_w=1200',
      preview: true
     },
     {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-565892073835593612/original/b443352a-33bc-48e8-a77b-f69360d881eb.jpeg?im_w=1200',
      preview: true
     },
     {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51637380/original/af7e3ab4-539f-4186-9e62-7f8a9626ffc8.jpeg?im_w=1200',
      preview: true
     },
     {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/1234e190-bee9-4298-8cf1-b1daf551dc91.jpg?im_w=1200',
      preview: true
     },
     {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-16388655/original/e9b13987-4da3-4307-9383-02d04bf41ac8.jpeg?im_w=1200',
      preview: true
     },
     {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-710967638131979227/original/87150602-94d5-497e-8f2c-147839316d52.jpeg?im_w=1200',
      preview: true
     },
     {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-686116352651008798/original/480a7f71-f22b-4cb0-991c-6457aea5d73b.jpeg?im_w=1200',
      preview: true
     },
     {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-12832100/original/9491da99-5e8e-4d47-8755-616204e5e8bd.jpeg?im_w=1200',
      preview: true
     },
     {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/3781269b-390e-46a9-9751-7bb7e021e6da.jpg?im_w=1200',
      preview: true
     },
     {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/48333c7b-3959-4822-b643-11053a481e91.jpg?im_w=1200',
      preview: true
     },
     {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48427474/original/e03d7445-4bb8-4253-9ab2-3e477d670587.jpeg?im_w=1200',
      preview: true
     },
     {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/683c7115-e408-4a40-ac01-05684b1d082d.jpg?im_w=1200',
      preview: true
     },
     {
      spotId: 13,
      url: 'https://a0.muscache.com/im/pictures/5353e356-04e6-4751-a5d7-a15f38300d4d.jpg?im_w=1200',
      preview: true
     },
     {
      spotId: 14,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-23014700/original/f39a8834-3b0e-4a87-baa1-5c103795f144.jpeg?im_w=1200',
      preview: true
     },
     {
      spotId: 15,
      url: 'https://a0.muscache.com/im/pictures/06524f0a-4450-44e4-ac42-1c729b0fc4ca.jpg?im_w=1200',
      preview: true
     },
     {
      spotId: 16,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47704822/original/555199cc-5706-450d-9654-3f976e96c68a.jpeg?im_w=1200',
      preview: true
     },
     {
      spotId: 17,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-25074830/original/1202902d-78a5-4fc7-af8a-b8846f23a67c.jpeg?im_w=1200',
      preview: true
     },
     {
      spotId: 18,
      url: 'https://a0.muscache.com/im/pictures/7a98ac57-354e-478f-9d6e-70c99d131397.jpg?im_w=1200',
      preview: true
     },
     {
      spotId: 19,
      url: 'https://a0.muscache.com/im/pictures/1852c1a3-f20f-4c09-b956-af57a36be501.jpg?im_w=1200',
      preview: true
     },
     {
      spotId: 20,
      url: 'https://a0.muscache.com/im/pictures/17046419-706e-4e32-af17-d485f057df47.jpg?im_w=1200',
      preview: true
     },


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
