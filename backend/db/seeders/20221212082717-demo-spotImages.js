"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48538355/original/a8c52a64-23d1-4cf7-96dc-f28f8edc984d.jpeg?im_w=1200",
          preview: true,
        },
        { spotId: 1,
          url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48538355/original/5de6456d-fe80-4324-901d-30f4de0f7133.jpeg?im_w=720',
          preview: false
        },
        { spotId: 1,
          url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48538355/original/e157cce9-0993-491b-9729-1d7b05f55ba9.jpeg?im_w=720',
          preview: false
        },
        { spotId: 1,
          url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48538355/original/271b7703-6c34-45bf-8f99-079306b9c258.jpeg?im_w=720',
          preview: false
        },
        { spotId: 1,
          url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48538355/original/7e88e2ff-0b92-48c1-891e-278344cfdf40.jpeg?im_w=720',
          preview: false
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-565892073835593612/original/b443352a-33bc-48e8-a77b-f69360d881eb.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-565892073835593612/original/5ab65c22-31d7-4988-a9cc-e090bb22ffd3.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-565892073835593612/original/0d67c162-f2dd-4604-967c-e7e62045be2f.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-565892073835593612/original/e92780b9-2e14-4481-af68-5003db4fc378.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-565892073835593612/original/a35d9ee1-4e85-4e04-8967-4174024fd83c.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51637380/original/af7e3ab4-539f-4186-9e62-7f8a9626ffc8.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51637380/original/8634096f-e801-4e82-91d0-35007662fafb.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51637380/original/c592ddc4-dbc5-474c-a412-4eb7b142d43c.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51637380/original/63ccff71-6634-4e84-87af-722e7a1dfaf4.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51637380/original/d5f45c4b-1d7d-4e49-810a-c7b3299da602.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/1234e190-bee9-4298-8cf1-b1daf551dc91.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/4177a416-7731-444e-99f4-d82991d2f40e.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/2b081434-934d-41da-b7a4-0beefab30d86.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/1b39277f-8afa-4c47-b498-c0d7b71079bf.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/45695d62-74ba-4d9e-b072-90d283068176.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-16388655/original/e9b13987-4da3-4307-9383-02d04bf41ac8.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-16388655/original/fc176dd7-4c28-4a27-a835-20c9b97bfb8a.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-16388655/original/406673a1-e3f7-4c89-8446-38bc375460d5.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-16388655/original/80dbde03-f13b-4867-8b89-53354542ca75.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-16388655/original/8f8c7c90-731b-4aa9-bc18-15f1a0552bb3.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-710967638131979227/original/87150602-94d5-497e-8f2c-147839316d52.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-710967638131979227/original/fb144190-a7bc-483a-a862-0bea2d10bb8e.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-710967638131979227/original/53a2fac5-8484-4f5e-91dc-4c74a3f57486.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-710967638131979227/original/071f55c7-8c54-487a-8535-20c211a56da7.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/fada0763-1c05-482d-9e93-de9d830fb783.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-686116352651008798/original/480a7f71-f22b-4cb0-991c-6457aea5d73b.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-686116352651008798/original/69d41522-6593-45d0-a812-bf726b9889cc.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-686116352651008798/original/00771073-5b50-4d0c-bc1d-233f2fc09175.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-686116352651008798/original/277c64c0-642e-4f81-bcc9-4ed1973af2a3.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-686116352651008798/original/4d7ce7bd-63fa-4133-95d5-68966b0bbc18.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-12832100/original/9491da99-5e8e-4d47-8755-616204e5e8bd.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-12832100/original/218f1734-72b3-4f01-bd18-9f447f41f3a5.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-12832100/original/88e011e1-29db-4c7b-a581-1d74c5e61f27.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-12832100/original/e6e2faae-b6be-415b-96af-ec6614309c1d.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-12832100/original/f4295c3c-ad54-44fb-b1fb-1bba8b9ca75b.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/3781269b-390e-46a9-9751-7bb7e021e6da.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/1cd9483b-906c-487c-85a2-1be105de460f.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/27815866-ef66-455c-951e-75d6d957e2ae.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/1f830d5c-1d74-4381-8a52-eaabf12814e5.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/a430c42c-b785-438e-9899-f101787bb8f5.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48427474/original/e03d7445-4bb8-4253-9ab2-3e477d670587.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48427474/original/569838e1-0cc3-48de-9dd2-916fb0adb8d5.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48427474/original/3c411005-f00b-4b71-b840-6fb8c91d5013.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48427474/original/c182a84e-4e4f-47ed-ac5d-f858364a57fb.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48427474/original/626aa981-84a1-42b3-be29-1904a8d953bd.jpeg?im_w=720",
          preview: false,
        },
        // {
        //   spotId: 19,
        //   url: "https://a0.muscache.com/im/pictures/1852c1a3-f20f-4c09-b956-af57a36be501.jpg?im_w=1200",
        //   preview: true,
        // },
        // {
        //   spotId: 20,
        //   url: "https://a0.muscache.com/im/pictures/17046419-706e-4e32-af17-d485f057df47.jpg?im_w=1200",
        //   preview: true,
        // },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        url: {
          [Op.in]: [
            "www.example1.com",
            "www.example1ext.com",
            "www.example3.com",
            "www.example4.com",
            "www.example5.com",
          ],
        },
      },
      {}
    );
  },
};
