const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ImageSchema = new Schema({
  property: {
    type: Schema.Types.ObjectId,
    ref: 'properties'
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = Image = mongoose.model('images', ImageSchema);
