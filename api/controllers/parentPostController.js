'use strict';


var mongoose = require('mongoose').set('debug', true),

//Handle members collection
ParentPost = mongoose.model('parentPost');

exports.getAll = function (req, res) {
  ParentPost.find({}, function (err, parentPost) {
    if (err)
      res.send(err);
    res.json(parentPost);
  });
};

exports.getPost = function(req, res) {
  //var objectID = mongoose.Types.ObjectId(req.params.memberId);
  var ObjectId = require('mongoose').Types.ObjectId;
 var elementId = new ObjectId(req.params.postId);
 //var query = {_id: elementid};
 console.log(req.params.postId);
 ParentPost.findById(req.params.postId, function(err, member) {
     if (err){
       res.send(err); 
       console.log(err);
     }
     res.json(member);
   });
 };

exports.createOne = function(req, res) {
  var newParentPost = new ParentPost(req.body);
  newParentPost.save(function(err, parentPost) {
    if (err)
      res.send(err);
    res.json(parentPost);
  });
};

exports.getOne = function(req, res) {
 //var objectID = mongoose.Types.ObjectId(req.params.postId);
 var ObjectId = require('mongoose').Types.ObjectId;
var elementId = new ObjectId(req.params.postId);
//var query = {_id: elementid};
console.log(req.params.postId);
  Post.findById(req.params.postId, function(err, parentPost) {
    if (err){
      res.send(err); 
      console.log(err);
    }
    res.json(parentPost);
  });
};


// Show employee by id
exports.getOneOther = function(req, res) {
  Post.findOne({_id: req.params.parentPostId}).exec(function (err, parentPost) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.json(parentPost);
    }
  });
};




exports.updateOne = function(req, res) {
  ParentPost.findOneAndUpdate({_id: req.params.postId}, req.body, {new: true},
     function(err, post) {
    if (err)
      res.send(err);
    res.json(parentPost);
  });
};

exports.deleteOne = function(req, res) {
  ParentPost.remove({
    _id: req.params.postId
  }, function(err, parentPost) {
    if (err)
      res.send(err);
    res.json({ message: 'project successfully deleted' });
  });
};
