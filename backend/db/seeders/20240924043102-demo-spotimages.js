'use strict';

const {User,Spot,SpotImage,Review,ReviewImage,Booking} = require("../../db/models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const SpotImages = [
  {
    spotId: 1,
    url: "/images/house1.webp",
    preview: true,
  },
  {
    spotId: 1,
    url: "/images/house2.webp",
    preview: false,
  },
  {
    spotId: 1,
    url: "/images/house3.webp",
    preview: false,
  },
  {
    spotId: 1,
    url: "/images/house4.webp",
    preview: false,
  },
  {
    spotId: 1,
    url: "/images/house5.webp",
    preview: false,
  },
  {
    spotId: 2,
    url: "/images/house6.webp",
    preview: true,
  },
  {
    spotId: 2,
    url: "/images/house7.webp",
    preview: false,
  },
  {
    spotId: 2,
    url: "/images/house8.webp",
    preview: false,
  },
  {
    spotId: 2,
    url: "/images/house9.webp",
    preview: false,
  },
  {
    spotId: 2,
    url: "/images/house10.webp",
    preview: false,
  },
  {
    spotId: 3,
    url: "/images/house11.webp",
    preview: true,
  },
  {
    spotId: 3,
    url: "/images/house12.webp",
    preview: false,
  },
  {
    spotId: 3,
    url: "/images/house13.webp",
    preview: false,
  },
  {
    spotId: 3,
    url: "/images/house14.webp",
    preview: false,
  },
  {
    spotId: 3,
    url: "/images/house15.webp",
    preview: false,
  },
  {
    "spotId": 4,
    "url": "images/house16.webp",
    "preview": true
  },
  {
    "spotId": 4,
    "url": "images/house17.webp",
    "preview": false
  },
  {
    "spotId": 4,
    "url": "images/house18.webp",
    "preview": false
  },
  {
    "spotId": 4,
    "url": "images/house19.webp",
    "preview": false
  },
  {
    "spotId": 4,
    "url": "images/house20.webp",
    "preview": false
  },
  {
    "spotId": 5,
    "url": "images/house21.webp",
    "preview": true
  },
  {
    "spotId": 5,
    "url": "images/house22.webp",
    "preview": false
  },
  {
    "spotId": 5,
    "url": "images/house23.webp",
    "preview": false
  },
  {
    "spotId": 5,
    "url": "images/house24.webp",
    "preview": false
  },
  {
    "spotId": 5,
    "url": "images/house25.webp",
    "preview": false
  },
  {
    "spotId": 6,
    "url": "images/house26.webp",
    "preview": true
  },
  {
    "spotId": 6,
    "url": "images/house27.webp",
    "preview": false
  },
  {
    "spotId": 6,
    "url": "images/house28.webp",
    "preview": false
  },
  {
    "spotId": 6,
    "url": "images/house29.webp",
    "preview": false
  },
  {
    "spotId": 6,
    "url": "images/house30.webp",
    "preview": false
  },
  {
    "spotId": 7,
    "url": "images/house31.webp",
    "preview": true
  },
  {
    "spotId": 7,
    "url": "images/house32.webp",
    "preview": false
  },
  {
    "spotId": 7,
    "url": "images/house33.webp",
    "preview": false
  },
  {
    "spotId": 7,
    "url": "images/house34.webp",
    "preview": false
  },
  {
    "spotId": 7,
    "url": "images/house35.webp",
    "preview": false
  },
  {
    "spotId": 8,
    "url": "images/house36.webp",
    "preview": true
  },
  {
    "spotId": 8,
    "url": "images/house37.webp",
    "preview": false
  },
  {
    "spotId": 8,
    "url": "images/house38.webp",
    "preview": false
  },
  {
    "spotId": 8,
    "url": "images/house39.webp",
    "preview": false
  },
  {
    "spotId": 8,
    "url": "images/house40.webp",
    "preview": false
  },
  {
    "spotId": 9,
    "url": "images/house41.webp",
    "preview": true
  },
  {
    "spotId": 9,
    "url": "images/house42.webp",
    "preview": false
  },
  {
    "spotId": 9,
    "url": "images/house43.webp",
    "preview": false
  },
  {
    "spotId": 9,
    "url": "images/house44.webp",
    "preview": false
  },
  {
    "spotId": 9,
    "url": "images/house45.webp",
    "preview": false
  },
  {
    "spotId": 10,
    "url": "images/house46.webp",
    "preview": true
  },
  {
    "spotId": 10,
    "url": "images/house47.webp",
    "preview": false
  },
  {
    "spotId": 10,
    "url": "images/house48.webp",
    "preview": false
  },
  {
    "spotId": 10,
    "url": "images/house49.webp",
    "preview": false
  },
  {
    "spotId": 10,
    "url": "images/house50.webp",
    "preview": false
  },
  {
    "spotId": 11,
    "url": "images/house51.webp",
    "preview": true
  },
  {
    "spotId": 11,
    "url": "images/house52.webp",
    "preview": false
  },
  {
    "spotId": 11,
    "url": "images/house53.webp",
    "preview": false
  },
  {
    "spotId": 11,
    "url": "images/house54.webp",
    "preview": false
  },
  {
    "spotId": 11,
    "url": "images/house55.webp",
    "preview": false
  },
  {
    "spotId": 12,
    "url": "images/house56.webp",
    "preview": true
  },
  {
    "spotId": 12,
    "url": "images/house57.webp",
    "preview": false
  },
  {
    "spotId": 12,
    "url": "images/house58.webp",
    "preview": false
  },
  {
    "spotId": 12,
    "url": "images/house59.webp",
    "preview": false
  },
  {
    "spotId": 12,
    "url": "images/house60.webp",
    "preview": false
  },
  {
    "spotId": 13,
    "url": "images/house61.webp",
    "preview": true
  },
  {
    "spotId": 13,
    "url": "images/house62.webp",
    "preview": false
  },
  {
    "spotId": 13,
    "url": "images/house63.webp",
    "preview": false
  },
  {
    "spotId": 13,
    "url": "images/house64.webp",
    "preview": false
  },
  {
    "spotId": 13,
    "url": "images/house65.webp",
    "preview": false
  },
  {
    "spotId": 14,
    "url": "images/house66.webp",
    "preview": true
  },
  {
    "spotId": 14,
    "url": "images/house67.webp",
    "preview": false
  },
  {
    "spotId": 14,
    "url": "images/house68.webp",
    "preview": false
  },
  {
    "spotId": 14,
    "url": "images/house69.webp",
    "preview": false
  },
  {
    "spotId": 14,
    "url": "images/house70.webp",
    "preview": false
  },
  {
    "spotId": 15,
    "url": "images/house71.webp",
    "preview": true
  },
  {
    "spotId": 15,
    "url": "images/house72.webp",
    "preview": false
  },
  {
    "spotId": 15,
    "url": "images/house73.webp",
    "preview": false
  },
  {
    "spotId": 15,
    "url": "images/house74.webp",
    "preview": false
  },
  {
    "spotId": 15,
    "url": "images/house75.webp",
    "preview": false
  },
  {
    "spotId": 16,
    "url": "images/house76.webp",
    "preview": true
  },
  {
    "spotId": 16,
    "url": "images/house77.webp",
    "preview": false
  },
  {
    "spotId": 16,
    "url": "images/house78.webp",
    "preview": false
  },
  {
    "spotId": 16,
    "url": "images/house79.webp",
    "preview": false
  },
  {
    "spotId": 16,
    "url": "images/house80.webp",
    "preview": false
  },
  {
    "spotId": 17,
    "url": "images/house81.webp",
    "preview": true
  },
  {
    "spotId": 17,
    "url": "images/house82.webp",
    "preview": false
  },
  {
    "spotId": 17,
    "url": "images/house83.webp",
    "preview": false
  },
  {
    "spotId": 17,
    "url": "images/house84.webp",
    "preview": false
  },
  {
    "spotId": 17,
    "url": "images/house85.webp",
    "preview": false
  },
  {
    "spotId": 18,
    "url": "images/house86.webp",
    "preview": true
  },
  {
    "spotId": 18,
    "url": "images/house87.webp",
    "preview": false
  },
  {
    "spotId": 18,
    "url": "images/house88.webp",
    "preview": false
  },
  {
    "spotId": 18,
    "url": "images/house89.webp",
    "preview": false
  },
  {
    "spotId": 18,
    "url": "images/house90.webp",
    "preview": false
  },
  {
    "spotId": 19,
    "url": "images/house91.webp",
    "preview": true
  },
  {
    "spotId": 19,
    "url": "images/house92.webp",
    "preview": false
  },
  {
    "spotId": 19,
    "url": "images/house93.webp",
    "preview": false
  },
  {
    "spotId": 19,
    "url": "images/house94.webp",
    "preview": false
  },
  {
    "spotId": 19,
    "url": "images/house95.webp",
    "preview": false
  },
  {
    "spotId": 20,
    "url": "images/house96.webp",
    "preview": true
  },
  {
    "spotId": 20,
    "url": "images/house97.webp",
    "preview": false
  },
  {
    "spotId": 20,
    "url": "images/house98.webp",
    "preview": false
  },
  {
    "spotId": 20,
    "url": "images/house99.webp",
    "preview": false
  },
  {
    "spotId": 20,
    "url": "images/house100.webp",
    "preview": false
  },
  {
    "spotId": 21,
    "url": "images/house101.webp",
    "preview": true
  },
  {
    "spotId": 21,
    "url": "images/house102.webp",
    "preview": false
  },
  {
    "spotId": 21,
    "url": "images/house103.webp",
    "preview": false
  },
  {
    "spotId": 21,
    "url": "images/house104.webp",
    "preview": false
  },
  {
    "spotId": 21,
    "url": "images/house105.webp",
    "preview": false
  },
  {
    "spotId": 22,
    "url": "images/house106.webp",
    "preview": true
  },
  {
    "spotId": 22,
    "url": "images/house107.webp",
    "preview": false
  },
  {
    "spotId": 22,
    "url": "images/house108.webp",
    "preview": false
  },
  {
    "spotId": 22,
    "url": "images/house109.webp",
    "preview": false
  },
  {
    "spotId": 22,
    "url": "images/house110.webp",
    "preview": false
  },
  {
    "spotId": 23,
    "url": "images/house111.webp",
    "preview": true
  },
  {
    "spotId": 23,
    "url": "images/house112.webp",
    "preview": false
  },
  {
    "spotId": 23,
    "url": "images/house113.webp",
    "preview": false
  },
  {
    "spotId": 23,
    "url": "images/house114.webp",
    "preview": false
  },
  {
    "spotId": 23,
    "url": "images/house115.webp",
    "preview": false
  },
  {
    "spotId": 24,
    "url": "images/house116.webp",
    "preview": true
  },
  {
    "spotId": 24,
    "url": "images/house117.webp",
    "preview": false
  },
  {
    "spotId": 24,
    "url": "images/house118.webp",
    "preview": false
  },
  {
    "spotId": 24,
    "url": "images/house119.webp",
    "preview": false
  },
  {
    "spotId": 24,
    "url": "images/house120.webp",
    "preview": false
  },
  {
    "spotId": 25,
    "url": "images/house121.webp",
    "preview": true
  },
  {
    "spotId": 25,
    "url": "images/house122.webp",
    "preview": false
  },
  {
    "spotId": 25,
    "url": "images/house123.webp",
    "preview": false
  },
  {
    "spotId": 25,
    "url": "images/house124.webp",
    "preview": false
  },
  {
    "spotId": 25,
    "url": "images/house125.webp",
    "preview": false
  }

];


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await SpotImage.bulkCreate(SpotImages,{validate:true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, SpotImages, {});
  }
};
