// head of this page
const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser ,requireAuth} = require('../../utils/auth');
const {User,Spot,SpotImage,Review,ReviewImage,Booking} = require("../../db/models");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//delete image by spot id

router.delete('/:imageId', requireAuth,async ( req, res, next ) => {
    // const { user } = req;

    // console.log(req.params)

    // console.log(req.url);

    // const imageId = req.params.imageId;

    // const image  = await SpotImage.findByPk(imageId);

    // const spot = await Spot.findByPk(image.spotId);

    // if( image && spot.ownerId === user.id ) {
    //     await SpotImage.destroy({
    //         where: {imageId}
    //     });

    //     return res.json( {message: "Successfully deleted."} );
    // }

    // return res.status(404).json( {message: "Spot Image couldn't be found"});
    const spotImage = await SpotImage.findByPk(req.params.imageId, {
        include: { model: Spot, attributes: ["ownerId"] },
      });
      
      if (!spotImage) {
        return res.status(404).json({
          message: "Spot Image couldn't be found",
        });
      }
    
      const ownerId = spotImage.Spot.ownerId;
      const { user } = req;
      if (ownerId !== user.id) {
        return res.status(403).json({
          message: "Forbidden",
        });
      }
    
      await spotImage.destroy();
      return res.status(200).json({
        message: "Successfully deleted",
      });



})


// end of this page
module.exports = router;