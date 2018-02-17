'use strict';

//members
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MembersSchema = new Schema({
  lastName: {
    type: String,
    Required: 'Kindly enter the name '
  },
  surName: {
    type: String,
    Required: 'Kindly enter the surname'
  }

});

module.exports = mongoose.model('members', MembersSchema);

//projects
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: {
    type: String,
    Required: 'Kindly enter the name of the project'
  },
  description: {
    type: String,
    Required: 'Kindly enter the description of the project'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  manager: {
    type: Schema.Types.ObjectId, ref: 'members'
  },
  members: [
    { type: Schema.Types.ObjectId, ref: 'members' }
  ],
  tasks: [{
    name: String,
    status: {
      type: [{
        type: String,
        enum: ['pending', 'ongoing', 'completed']
      }],
      default: ['pending']
    },
    members: [
    { type: Schema.Types.ObjectId, ref: 'members' }
  ],
  }]
});
module.exports = mongoose.model('projects', ProjectSchema);