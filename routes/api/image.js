const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Property Model
const Property = require('../../models/Property');

// Load Image Model
const Image = require('../../models/Image');

// @route   GET api/image/test
// @desc    Tests Image route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Image Works' }));

// @route   GET api/images
// @desc    Get all images
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(images => res.json(images))
    .catch(err => res.status(404).json({ noimagesfound: 'No images found' }));
});

// @route   GET api/images
// @desc    Get property images
// @access  Private
router.get('/property/:propertyId', (req, res) => {
  const query = { property: req.params.propertyId };
  Image.find({ property: req.params.propertyId })
    .then(images => res.json(images))
    .catch(err => res.status(404).json({ noimagesfound: 'No images found' }));
});

// @route   POST api/image
// @desc    Create or edit property image
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Get fields
    const imageFields = {};
    imageFields.property = req.body.propertyId;
    imageFields.name = req.body.name;
    imageFields.url = req.body.url;

    Image.findOne({ name: req.body.name }).then(image => {
      if (image) {
        // Update
        Image.findOneAndUpdate(
          { name: req.body.name },
          { $set: imageFields },
          { new: true }
        ).then(image => res.json(image));
      } else {
        // Save Image
        new Image(imageFields).save().then(image => res.json(image));
      }
    });
  }
);

module.exports = router;
