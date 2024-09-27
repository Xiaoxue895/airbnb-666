// head of this page
const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser,requireAuth} = require('../../utils/auth');
const {User,Spot,SpotImage,Review,ReviewImage,Booking} = require("../../db/models");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//delete image by review id

router.delete('/:imageId',requireAuth, async ( req, res, next ) => {
    // const { user } = req;

    // const imageId = req.params.imageId;

    // console.log(req.params)

    // const image  = await ReviewImage.findByPk(imageId);

    // console.log(image)

    // const review = await Review.findByPk(image.reviewId);

    // if( image && review.userId === user.id ) {
    //     await ReviewImage.destroy({
    //         where: {imageId}
    //     });

    //     return res.json( {message: "Successfully deleted."} );
    // }

    // return res.status(404).json( {message: "Review Image couldn't be found"});


    //1. find the review-image
    //2. if we do not have review-image return 404:Review Image couldn't be found
    
    const reviewImage = await ReviewImage.findByPk(req.params.imageId, {
        include: { model: Review, attributes: ["userId"] },
      });
    
      if (!reviewImage) {
        return res.status(404).json({
          message: "Review Image couldn't be found",
        });
      }

    //3. check the userid
    const reviewId = reviewImage.dataValues.reviewId;
    const review = await Review.findByPk(reviewId);
    const userId = review.dataValues.userId;
    const { user } = req;

    if (userId !== user.id) {
        return res.status(403).json({
          message: "Forbidden",
        });
      } else {
        await reviewImage.destroy();
        return res.status(200).json({
          message: "Successfully deleted",
        });
      }
 
})


// end of this page
module.exports = router;