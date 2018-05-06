'use strict';
module.exports = function(app) {
var projectsController = require('../controllers/projectsController');
var membersController = require('../controllers/membersController');
var postsController = require('../controllers/postsController');
var parentPostController = require('../controllers/parentPostController');


 //projects
  app.route('/projects')
    .get(projectsController.getAllProjects)
    .post(projectsController.createProject);

  app.route('/projects/:projectId')
    .get(projectsController.getProject)
    .put(projectsController.updateProject)
    .delete(projectsController.deleteProject)
    .put(projectsController.addTasksToProject);

//members
  app.route('/members')
    .get(membersController.getAllProjects)
    .post(membersController.createMember);

  app.route('/members/:memberId')
    .get(membersController.getMember)
    .put(membersController.updateMember)
    .delete(membersController.deleteMember);

//posts
  app.route('/posts')
  .get(postsController.getAllPosts)
  .post(postsController.createOnePost);

   
//parentPosts
  app.route('/parentPosts')
  .get(parentPostController.getAll)
  .post(parentPostController.createOne); 
  app.route('/parentPosts/:parentPostId')
    .get(parentPostController.getOne)
    .put(parentPostController.updateOne)
    .delete(parentPostController.deleteOne)
};