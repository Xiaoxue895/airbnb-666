// head of this page
const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const {User,Spot,SpotImage,Review,ReviewImage,Booking} = require("../../db/models");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


// maybe we need validate

// Get all Spots
// need three model:user;review(avgRating);spotimage(previewImage)

router.get("/", async (req, res) => {

    const { page = 1, size = 100 } = req.query; 
    const limit = parseInt(size);
    const offset = limit * (page - 1);
  
    try {
      const spots = await Spot.findAll({
        limit,
        offset,
        attributes: {
          include: [
            [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgRating"],
          ],
        },
        include: [
          {
            model: Review,
            attributes: [],
          },
          {
            model: SpotImage,
            attributes: ["url"],
            where: { preview: true },
            required: false,
          },
        ],
        group: ["Spot.id", "SpotImage.id"],
      });
  
      const spotDetails = spots.map((spot) => ({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating: spot.dataValues.avgRating ? parseFloat(spot.dataValues.avgRating).toFixed(1) : "No rating yet.",
        previewImage: spot.SpotImages.length ? spot.SpotImages[0].url : "No preview image yet."
      }));
  
      return res.status(200).json({ Spots: spotDetails, page: parseInt(page), size: parseInt(size) });
    } catch (error) {
      return res.status(500).json({ message: "err" });
    }
  });




// Get all Spots owned by the Current User 
router.get("/current", async (req, res) => {
    const { user } = req;
  
    try {
      const spots = await Spot.findAll({
        where: { ownerId: user.id },
        attributes: {
          include: [
            [Sequelize.fn("AVG", Sequelize.col("Review.stars")), "avgRating"],
          ],
        },
        include: [
          {
            model: Review,
            attributes: [],
          },
          {
            model: SpotImage,
            attributes: ["url"],
            where: { preview: true },
            required: false,
          },
        ],
        group: ["Spot.id", "SpotImage.id"],
      });
  
      const spotDetails = spots.map((spot) => ({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating: spot.dataValues.avgRating ? parseFloat(spot.dataValues.avgRating).toFixed(1) : "No rating yet.",
        previewImage: spot.SpotImages.length ? spot.SpotImages[0].url : "No preview image yet."
      }));
  
      return res.status(200).json({ Spots: spotDetails });
    } catch (error) {
      return res.status(500).json({ message: "error" });
    }
  });
  


// Get details of a Spot from an id (four table)




// end of this page
module.exports = router;