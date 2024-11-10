const Accommodation = require('../Schemas/accommodationSchema');


  exports.createNewAccommodation = (req, res) => {
    const { title, host, location, description, price, imageUrl } = req.body;
    const images = req.body.images || []
  
    if(!title || !host || !location || !description || !price || !imageUrl) {
      res.status(400).json({
        message: 'You need to enter all the fields'
      })
      return
    }
  
    Accommodation.create({ title, host, location, description, price, imageUrl, images })
      .then(data => res.status(201).json(data))
      .catch(() => res.status(500).json({ message: 'Someting went wrong when adding the accommodation'}))
  }



exports.getAccommodations = (req, res) => {

  Accommodation.find()
    .then(accommodations => {
      res.status(200).json(accommodations)
    })
    .catch(() => {
      res.status(500).json({
        message: 'Could not get the accommodations'
      })
    })
}



exports.getAccommodationById = (req, res) => {

  Accommodation.findById(req.params.id)
    .then(accommodation => {
      if(!accommodation) {
        res.status(404).json({ message: 'could not find that accommodation'})
        return
      }

      res.status(200).json( accommodation ) 
    })
    .catch(() => {
      res.status(500).json({
        message: 'Someting went wrong'
      })
    })
  }



exports.updateAccommodation = (req, res) => {

  Accommodation.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(accommodation => {
      if(!accommodation) {
        res.status(404).json({ message: 'could not find that accommodation'})
        return
      }

      res.status(200).json(accommodation)
    })
    .catch(() => {
      res.status(500).json({
        message: 'Someting went wrong when updating the accommodation'
      })
    })

}



exports.deleteAccommodation = (req, res) => {

  Accommodation.findByIdAndDelete(req.params.id)
    .then(accommodation => {
      if(!accommodation) {
        res.status(404).json({ message: 'could not find that accommodation'})
        return
      }

      res.status(200).json({ id: accommodation._id })
    })
    .catch(() => {
      res.status(500).json({
        message: 'Someting went wrong when deleteing the accommodation'
      })
    })
}