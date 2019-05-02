const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PropertySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  description: {
    type: String,
    required: true,
    max: 40
  },
  reference: {
    type: String,
    required: true,
    max: 20
  },

  website: {
    type: String
  },
  location: {
    type: String
  },
  price: {
    type: Number
  },
  images: [
    {
      name: String,
      url: String
    }
  ],

  distribution: [
    {
      rooms: {
        type: Number
      },
      bathrooms: {
        type: Number
      },
      meters: {
        type: Number
      }
    }
  ],
  features: [
    {
      fridge: {
        type: Boolean,
        default: false
      },
      washer: {
        type: Boolean,
        default: false
      },
      ca: {
        type: Boolean,
        default: false
      },
      heath: {
        type: Boolean,
        default: false
      }
    }
  ]
});

module.exports = Property = mongoose.model('properties', PropertySchema);
