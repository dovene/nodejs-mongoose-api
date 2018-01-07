'use strict';


var mongoose = require('mongoose'),

  //Handle projects collection
  Project = mongoose.model('projects');

exports.addTasksToProject = function (req, res) {
  var task = {
    name: req.body.taskName,
    status: req.body.taskStauts
  };
var task=[{
    name: 'test',
    status: 'pending',
    members: ['59a1b786554ce90a7a0b376a']
  }];


  Project.findById(req.params.projectId, function (err, project) {
    if (err) 
      res.send(err);
    project.tasks=task;
    project.save(function (err) {
      if (err) 
        return res.send(err);
      res.json({ status: 'done' });
    });
    res.json(project);
  });
};

exports.getAllProjects = function (req, res) {
  Project.find({}, function (err, project) {
    if (err)
      res.send(err);
    res.json(project);
  });
};

exports.createProject = function (req, res) {
  var newProject = new Project(req.body);
  newProject.save(function (err, project) {
    if (err)
      res.send(err);
    res.json(project);
  });
};

exports.getProject = function (req, res) {
  Project.findById(req.params.projectId, function (err, project) {
    if (err)
      res.send(err);
    res.json(project);
  });
};

exports.updateProject = function (req, res) {
  Project.findOneAndUpdate({ _id: req.params.projectId }, req.body, { new: true },
    function (err, project) {
      if (err)
        res.send(err);
      res.json(project);
    });
};

exports.deleteProject = function (req, res) {
  Project.remove({
    _id: req.params.projectId
  }, function (err, project) {
    if (err)
      res.send(err);
    res.json({ message: 'project successfully deleted' });
  });
};
