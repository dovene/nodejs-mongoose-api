'use strict';
module.exports = function(app) {
var projectsController = require('../controllers/projectsController');
var membersController = require('../controllers/membersController');


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


};