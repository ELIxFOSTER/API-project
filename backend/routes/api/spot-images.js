const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, Review } = require("../../db/models");


//? Delete a Spot Image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params
    const userId = req.user.id

    const spotImage = await SpotImage.findByPk(imageId)
    const spot = await Spot.findOne({
        include: [
            { model: SpotImage,
                where: {
                    id: imageId
                }
            }
        ]
    })

    if (spotImage) {
        if (spot.ownerId !== userId) {
            const error = Error('Permission denied')
            error.status = 403
            next(error)
        } else {
            await spotImage.destroy()
            res.status(200)
            return res.json({
                message: 'Successfully deleted',
                statusCode: 200,
            })
        }
    } else {
        const error = Error("Spot image couldn't be found")
        error.status = 404
        next(error)
    }
})

module.exports = router
