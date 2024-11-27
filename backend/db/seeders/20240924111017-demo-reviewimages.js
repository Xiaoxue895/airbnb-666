'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ReviewImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const reviewImageData = [
  {
    reviewId: 1,
    url: "frontend/public/images/r-1.jpg"
  },
  {
    reviewId: 2,
    url: "frontend/public/images/r-2.jpg"
  },
  {
    reviewId: 3,
    url: "frontend/public/images/r-3.jpg"
  },
  {
    reviewId: 4,
    url: "frontend/public/images/r-4.jpg"
  },
  {
    reviewId: 5,
    url: "frontend/public/images/r-5.jpg"
  },
  {
    reviewId: 6,
    url: "frontend/public/images/r-6.jpg"
  },
  {
    reviewId: 7,
    url: "frontend/public/images/r-7.jpg"
  },
  {
    reviewId: 8,
    url: "frontend/public/images/r-8.jpg"
  },

]

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
    await ReviewImage.bulkCreate(reviewImageData, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "ReviewImages";
    return queryInterface.bulkDelete(options, {
      reviewId: reviewImageData.map( ReviewImages => ReviewImages.reviewId)
    }, {});
  }
};
