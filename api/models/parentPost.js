'use strict';

//members
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParentPostSchema = new Schema({
  category: {
    type: String,
    Required: 'Kindly enter the category '
  },
  title: {
    type: String,
    Required: 'Kindly enter the title'
  },
  description: {
    type: String,
    Required: 'Kindly enter the description'
  },
  keyWords: {
    type: Array
  },
  image: {
    type: String
  }
});

module.exports = mongoose.model('parentPostSchema', ParentPostSchema);
