'use strict';
module.exports = function(app) {

var parentPostCategoryController = require('../controllers/parentPostCategoryController');

   
//parentPostsCategory
  app.route('/parentPostsCategory')
  .get(parentPostCategoryController.getAll)
  .post(parentPostCategoryController.createOne); 

  
  app.route('/parentPostsCategory/:postId')
    .get(parentPostCategoryController.getOne)
    .put(parentPostCategoryController.updateOne)
    .delete(parentPostCategoryController.deleteOne);
};