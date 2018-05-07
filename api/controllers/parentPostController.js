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


exports.updateOne = function(req, res) {
    ParentPost.findByIdAndUpdate(req.params.postId, { $set: { title: req.body.title, 
      category: req.body.category, description: req.body.description }}, 
      { new: true },
     function(err, post) {
    if (err)
      res.send(err);
      res.json(post);
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
