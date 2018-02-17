'use strict';


var mongoose = require('mongoose').set('debug', true),

//Handle members collection
Member = mongoose.model('members');

exports.getAllProjects = function(req, res) {
  Member.find({}, function(err, member) {
    if (err)
      res.send(err);
    res.json(member);
  });
};

exports.createMember = function(req, res) {
  var newMember = new Member(req.body);
  newMember.save(function(err, member) {
    if (err)
      res.send(err);
    res.json(member);
  });
};

exports.getMember = function(req, res) {
 //var objectID = mongoose.Types.ObjectId(req.params.memberId);
 var ObjectId = require('mongoose').Types.ObjectId;
var elementId = new ObjectId(req.params.memberId);
//var query = {_id: elementid};
console.log(req.params.memberId);
  Member.findById(req.params.memberId, function(err, member) {
    if (err){
      res.send(err); 
      console.log(err);
    }
    res.json(member);
  });
};

exports.updateMember = function(req, res) {
  Member.findOneAndUpdate({_id: req.params.memberId}, req.body, {new: true},
     function(err, member) {
    if (err)
      res.send(err);
    res.json(member);
  });
};

exports.deleteMember = function(req, res) {
  Member.remove({
    _id: req.params.memberId
  }, function(err, member) {
    if (err)
      res.send(err);
    res.json({ message: 'project successfully deleted' });
  });
};
