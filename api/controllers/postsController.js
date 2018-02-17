'use strict';


var mongoose = require('mongoose').set('debug', true),

//Handle members collection
Post = mongoose.model('post');

exports.getAllPosts = function (req, res) {
  Post.find({}, function (err, post) {
    if (err)
      res.send(err);
    res.json(post);
  });
};


exports.createOnePost = function(req, res) {
  var newPost = new Post(req.body);
  newPost.save(function(err, post) {
    if (err)
      res.send(err);
    res.json(post);
  });
};

exports.getOne = function(req, res) {
 //var objectID = mongoose.Types.ObjectId(req.params.postId);
 var ObjectId = require('mongoose').Types.ObjectId;
var elementId = new ObjectId(req.params.postId);
//var query = {_id: elementid};
console.log(req.params.postId);
  Post.findById(req.params.postId, function(err, post) {
    if (err){
      res.send(err); 
      console.log(err);
    }
    res.json(post);
  });
};

exports.updateOne = function(req, res) {
  Post.findOneAndUpdate({_id: req.params.postId}, req.body, {new: true},
     function(err, post) {
    if (err)
      res.send(err);
    res.json(post);
  });
};

exports.deleteOne = function(req, res) {
  Post.remove({
    _id: req.params.postId
  }, function(err, post) {
    if (err)
      res.send(err);
    res.json({ message: 'project successfully deleted' });
  });
};
