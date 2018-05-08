'use strict';

//members
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParentPostCategorySchema = new Schema({
  description: {
    type: String,
    Required: 'Kindly enter the description '
  },
  imagePath: {
    type: String,
    Required: 'Kindly enter the description ',
    },
  imageOriginalName: {
    type: String,
    Required: 'Kindly enter the image original name '
    }
});

module.exports = mongoose.model('parentPostCategory', ParentPostCategorySchema);
