'use strict';

var formidable = require('formidable');
var fs = require('fs');
var mongoose = require('mongoose').set('debug', true),

ParentPostCategory = mongoose.model('parentPostCategory');

exports.getAll = function (req, res) {
  ParentPostCategory.find({}, function (err, parentPost) {
    if (err)
      res.send(err);
    res.json(parentPost);
  });
};



exports.createOne = function(req, res) {
  var newParentPostCategory = new ParentPostCategory(req.body);

  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.filetoupload.path;
    var newpath = '/images/' + files.filetoupload.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) {
        res.send(err);
      }else{
        res.write('File uploaded and moved!');     
        newParentPostCategory.save(function(err, parentPostCategory) {
          if (err)
            res.send(err);
          res.json(parentPostCategory);
        });
      }
      
    });
}); 
};



exports.getOne = function(req, res) {
ParentPostCategory.findById(req.params.postId, function(err, parentPostCategory) {
    if (err){
      res.send(err); 
      console.log(err);
    }
    res.json(parentPostCategory);
  });
};


exports.updateOne = function(req, res) {
  ParentPostCategory.findByIdAndUpdate(req.params.postId, { $set: { imagePath: req.body.imagePath, 
      imageOriginalName: req.body.imageOriginalName, description: req.body.description }}, 
      { new: true },
     function(err, parentPostCategory) {
    if (err)
      res.send(err);
      res.json(parentPostCategory);
  });
};

exports.deleteOne = function(req, res) {
  ParentPostCategory.remove({
    _id: req.params.postId
  }, function(err, parentPostCategory) {
    if (err)
      res.send(err);
    res.json({ message: 'category successfully deleted' });
  });
};

