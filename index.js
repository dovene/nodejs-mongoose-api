var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  //Task = require('./api/models/todoListModel'), //created model loading here
  MongoClient = require('mongodb').MongoClient,
  Project = require('./api/models/projectModel'), 
  Post = require('./api/models/post'), 

  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
var connectionString = 'mongodb://localhost/projectManager'
connectionString = 'mongodb://elom:ok@ds259855.mlab.com:59855/pack'
mongoose.connect(connectionString); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/projectManagerRoutes'); //importing route
routes(app); //register the route


app.listen(port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
console.log('todo list RESTful API server started on: ' + port);

