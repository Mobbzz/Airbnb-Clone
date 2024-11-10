const router = require('express').Router();
const accommodationModel = require('../Models/accommodationModel')


router.post('/', accommodationModel.createNewAccommodation);

router.get('/', accommodationModel.getAccommodations);

router.get('/:id', accommodationModel.getAccommodationById);

router.put('/:id', accommodationModel.updateAccommodation);

router.delete('/:id', accommodationModel.deleteAccommodation);



module.exports = router;

