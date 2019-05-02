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

// @route   GET api/property
// @desc    Get current users property
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Property.findOne({ property: req.property.id })
      .populate('property', ['id'])
      .then(image => {
        if (!image) {
          errors.noimage = 'There is no image for this property';
          return res.status(404).json(errors);
        }
        res.json(image);
      })
      .catch(err => res.status(404).json(err));
  }
);

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

    Image.findOne({ property: req.body.propertyId }).then(image => {
      if (image) {
        // Update
        Image.findOneAndUpdate(
          { property: req.body.propertyId },
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
