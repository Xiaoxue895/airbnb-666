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
    url: "frontend/public/images/house1.webp",
    preview: true,
  },
  {
    spotId: 1,
    url: "frontend/public/images/house2.webp",
    preview: false,
  },
  {
    spotId: 1,
    url: "frontend/public/images/house3.webp",
    preview: false,
  },
  {
    spotId: 1,
    url: "frontend/public/images/house4.webp",
    preview: false,
  },
  {
    spotId: 1,
    url: "frontend/public/images/house5.webp",
    preview: false,
  },
  {
    spotId: 2,
    url: "frontend/public/images/house6.webp",
    preview: true,
  },
  {
    spotId: 2,
    url: "frontend/public/images/house7.webp",
    preview: false,
  },
  {
    spotId: 2,
    url: "frontend/public/images/house8.webp",
    preview: false,
  },
  {
    spotId: 2,
    url: "frontend/public/images/house9.webp",
    preview: false,
  },
  {
    spotId: 2,
    url: "frontend/public/images/house10.webp",
    preview: false,
  },
  {
    spotId: 3,
    url: "frontend/public/images/house11.webp",
    preview: true,
  },
  {
    spotId: 3,
    url: "frontend/public/images/house12.webp",
    preview: false,
  },
  {
    spotId: 3,
    url: "frontend/public/images/house13.webp",
    preview: false,
  },
  {
    spotId: 3,
    url: "frontend/public/images/house14.webp",
    preview: false,
  },
  {
    spotId: 3,
    url: "frontend/public/images/house15.webp",
    preview: false,
  },
  {
    spotId: 4,
    url: "frontend/public/images/house16.webp",
    preview: true,
  },
  {
    spotId: 4,
    url: "frontend/public/images/house17.webp",
    preview: false,
  },
  {
    spotId: 4,
    url: "frontend/public/images/house18.webp",
    preview: false,
  },
  {
    spotId: 4,
    url: "frontend/public/images/house19.webp",
    preview: false,
  },
  {
    spotId: 4,
    url: "frontend/public/images/house20.webp",
    preview: false,
  },
  {
    spotId: 5,
    url: "frontend/public/images/house21.webp",
    preview: true,
  },
  {
    spotId: 5,
    url: "frontend/public/images/house22.webp",
    preview: false,
  },
  {
    spotId: 5,
    url: "frontend/public/images/house23.webp",
    preview: false,
  },
  {
    spotId: 5,
    url: "frontend/public/images/house24.webp",
    preview: false,
  },
  {
    spotId: 5,
    url: "frontend/public/images/house25.webp",
    preview: false,
  },
  {
    spotId: 6,
    url: "frontend/public/images/house26.webp",
    preview: true,
  },
  {
    spotId: 6,
    url: "frontend/public/images/house27.webp",
    preview: false,
  },
  {
    spotId: 6,
    url: "frontend/public/images/house28.webp",
    preview: false,
  },
  {
    spotId: 6,
    url: "frontend/public/images/house29.webp",
    preview: false,
  },
  {
    spotId: 6,
    url: "frontend/public/images/house30.webp",
    preview: false,
  },
  {
    spotId: 7,
    url: "frontend/public/images/house31.webp",
    preview: true,
  },
  {
    spotId: 7,
    url: "frontend/public/images/house32.webp",
    preview: false,
  },
  {
    spotId: 7,
    url: "frontend/public/images/house33.webp",
    preview: false,
  },
  {
    spotId: 7,
    url: "frontend/public/images/house34.webp",
    preview: false,
  },
  {
    spotId: 7,
    url: "frontend/public/images/house35.webp",
    preview: false,
  },
  {
    spotId: 8,
    url: "frontend/public/images/house36.webp",
    preview: true,
  },
  {
    spotId: 8,
    url: "frontend/public/images/house37.webp",
    preview: false,
  },
  {
    spotId: 8,
    url: "frontend/public/images/house38.webp",
    preview: false,
  },
  {
    spotId: 8,
    url: "frontend/public/images/house39.webp",
    preview: false,
  },
  {
    spotId: 8,
    url: "frontend/public/images/house40.webp",
    preview: false,
  },
  {
    spotId: 9,
    url: "frontend/public/images/house41.webp",
    preview: true,
  },
  {
    spotId: 9,
    url: "frontend/public/images/house42.webp",
    preview: false,
  },
  {
    spotId: 9,
    url: "frontend/public/images/house43.webp",
    preview: false,
  },
  {
    spotId: 9,
    url: "frontend/public/images/house44.webp",
    preview: false,
  },
  {
    spotId: 9,
    url: "frontend/public/images/house45.webp",
    preview: false,
  },
  {
    spotId: 10,
    url: "frontend/public/images/house46.webp",
    preview: true,
  },
  {
    spotId: 10,
    url: "frontend/public/images/house47.webp",
    preview: false,
  },
  {
    spotId: 10,
    url: "frontend/public/images/house48.webp",
    preview: false,
  },
  {
    spotId: 10,
    url: "frontend/public/images/house49.webp",
    preview: false,
  },
  {
    spotId: 10,
    url: "frontend/public/images/house50.webp",
    preview: false,
  },
  {
    spotId: 11,
    url: "frontend/public/images/house51.webp",
    preview: true,
  },
  {
    spotId: 11,
    url: "frontend/public/images/house52.webp",
    preview: false,
  },
  {
    spotId: 11,
    url: "frontend/public/images/house53.webp",
    preview: false,
  },
  {
    spotId: 11,
    url: "frontend/public/images/house54.webp",
    preview: false,
  },
  {
    spotId: 11,
    url: "frontend/public/images/house55.webp",
    preview: false,
  },
  {
    spotId: 12,
    url: "frontend/public/images/house56.webp",
    preview: true,
  },
  {
    spotId: 12,
    url: "frontend/public/images/house57.webp",
    preview: false,
  },
  {
    spotId: 12,
    url: "frontend/public/images/house58.webp",
    preview: false,
  },
  {
    spotId: 12,
    url: "frontend/public/images/house59.webp",
    preview: false,
  },
  {
    spotId: 12,
    url: "frontend/public/images/house60.webp",
    preview: false,
  },
  {
    spotId: 13,
    url: "frontend/public/images/house61.webp",
    preview: true,
  },
  {
    spotId: 13,
    url: "frontend/public/images/house62.webp",
    preview: false,
  },
  {
    spotId: 13,
    url: "frontend/public/images/house63.webp",
    preview: false,
  },
  {
    spotId: 13,
    url: "frontend/public/images/house64.webp",
    preview: false,
  },
  {
    spotId: 13,
    url: "frontend/public/images/house65.webp",
    preview: false,
  },
  {
    spotId: 14,
    url: "frontend/public/images/house66.webp",
    preview: true,
  },
  {
    spotId: 14,
    url: "frontend/public/images/house67.webp",
    preview: false,
  },
  {
    spotId: 14,
    url: "frontend/public/images/house68.webp",
    preview: false,
  },
  {
    spotId: 14,
    url: "frontend/public/images/house69.webp",
    preview: false,
  },
  {
    spotId: 14,
    url: "frontend/public/images/house70.webp",
    preview: false,
  },
  {
    spotId: 15,
    url: "frontend/public/images/house71.webp",
    preview: true,
  },
  {
    spotId: 15,
    url: "frontend/public/images/house72.webp",
    preview: false,
  },
  {
    spotId: 15,
    url: "frontend/public/images/house73.webp",
    preview: false,
  },
  {
    spotId: 15,
    url: "frontend/public/images/house74.webp",
    preview: false,
  },
  {
    spotId: 15,
    url: "frontend/public/images/house75.webp",
    preview: false,
  },
  {
    spotId: 16,
    url: "frontend/public/images/house76.webp",
    preview: true,
  },
  {
    spotId: 16,
    url: "frontend/public/images/house77.webp",
    preview: false,
  },
  {
    spotId: 16,
    url: "frontend/public/images/house78.webp",
    preview: false,
  },
  {
    spotId: 16,
    url: "frontend/public/images/house79.webp",
    preview: false,
  },
  {
    spotId: 16,
    url: "frontend/public/images/house80.webp",
    preview: false,
  },
  {
    spotId: 17,
    url: "frontend/public/images/house81.webp",
    preview: true,
  },
  {
    spotId: 17,
    url: "frontend/public/images/house82.webp",
    preview: false,
  },
  {
    spotId: 17,
    url: "frontend/public/images/house83.webp",
    preview: false,
  },
  {
    spotId: 17,
    url: "frontend/public/images/house84.webp",
    preview: false,
  },
  {
    spotId: 17,
    url: "frontend/public/images/house85.webp",
    preview: false,
  },
  {
    spotId: 18,
    url: "frontend/public/images/house86.webp",
    preview: true,
  },
  {
    spotId: 18,
    url: "frontend/public/images/house87.webp",
    preview: false,
  },
  {
    spotId: 18,
    url: "frontend/public/images/house88.webp",
    preview: false,
  },
  {
    spotId: 18,
    url: "frontend/public/images/house89.webp",
    preview: false,
  },
  {
    spotId: 18,
    url: "frontend/public/images/house90.webp",
    preview: false,
  },
  {
    spotId: 19,
    url: "frontend/public/images/house91.webp",
    preview: true,
  },
  {
    spotId: 19,
    url: "frontend/public/images/house92.webp",
    preview: false,
  },
  {
    spotId: 19,
    url: "frontend/public/images/house93.webp",
    preview: false,
  },
  {
    spotId: 19,
    url: "frontend/public/images/house94.webp",
    preview: false,
  },
  {
    spotId: 19,
    url: "frontend/public/images/house95.webp",
    preview: false,
  },
  {
    spotId: 20,
    url: "frontend/public/images/house96.webp",
    preview: true,
  },
  {
    spotId: 20,
    url: "frontend/public/images/house97.webp",
    preview: false,
  },
  {
    spotId: 20,
    url: "frontend/public/images/house98.webp",
    preview: false,
  },
  {
    spotId: 20,
    url: "frontend/public/images/house99.webp",
    preview: false,
  },
  {
    spotId: 20,
    url: "frontend/public/images/house100.webp",
    preview: false,
  },
  {
    spotId: 21,
    url: "frontend/public/images/house101.webp",
    preview: true,
  },
  {
    spotId: 21,
    url: "frontend/public/images/house102.webp",
    preview: false,
  },
  {
    spotId: 21,
    url: "frontend/public/images/house103.webp",
    preview: false,
  },
  {
    spotId: 21,
    url: "frontend/public/images/house104.webp",
    preview: false,
  },
  {
    spotId: 21,
    url: "frontend/public/images/house105.webp",
    preview: false,
  },
  {
    spotId: 22,
    url: "frontend/public/images/house106.webp",
    preview: true,
  },
  {
    spotId: 22,
    url: "frontend/public/images/house107.webp",
    preview: false,
  },
  {
    spotId: 22,
    url: "frontend/public/images/house108.webp",
    preview: false,
  },
  {
    spotId: 22,
    url: "frontend/public/images/house109.webp",
    preview: false,
  },
  {
    spotId: 22,
    url: "frontend/public/images/house110.webp",
    preview: false,
  },
  {
    spotId: 23,
    url: "frontend/public/images/house111.webp",
    preview: true,
  },
  {
    spotId: 23,
    url: "frontend/public/images/house112.webp",
    preview: false,
  },
  {
    spotId: 23,
    url: "frontend/public/images/house113.webp",
    preview: false,
  },
  {
    spotId: 23,
    url: "frontend/public/images/house114.webp",
    preview: false,
  },
  {
    spotId: 23,
    url: "frontend/public/images/house115.webp",
    preview: false,
  },
  {
    spotId: 24,
    url: "frontend/public/images/house116.webp",
    preview: true,
  },
  {
    spotId: 24,
    url: "frontend/public/images/house117.webp",
    preview: false,
  },
  {
    spotId: 24,
    url: "frontend/public/images/house118.webp",
    preview: false,
  },
  {
    spotId: 24,
    url: "frontend/public/images/house119.webp",
    preview: false,
  },
  {
    spotId: 24,
    url: "frontend/public/images/house120.webp",
    preview: false,
  },
  {
    spotId: 25,
    url: "frontend/public/images/house121.webp",
    preview: true,
  },
  {
    spotId: 25,
    url: "frontend/public/images/house122.webp",
    preview: false,
  },
  {
    spotId: 25,
    url: "frontend/public/images/house123.webp",
    preview: false,
  },
  {
    spotId: 25,
    url: "frontend/public/images/house124.webp",
    preview: false,
  },
  {
    spotId: 25,
    url: "frontend/public/images/house125.webp",
    preview: false,
  },


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
