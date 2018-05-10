'use strict';


var mongoose = require('mongoose').set('debug', true),
formidable = require('formidable'),
fs = require('fs'),
path = require('path'),
multer = require('multer'),
ParentPostCategory = mongoose.model('parentPostCategory');
const uploadDir = path.join(__dirname, '/..', '/..', '/..', '/uploads/') 


exports.getAll = function (req, res) {
  ParentPostCategory.find({}, function (err, parentPost) {
    if (err)
      res.send(err);
    res.json(parentPost);
  });
};







// Upload files
var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
  //cb(null, './images');
  cb(null, __dirname.replace('routes', '') + '/uploads');
  },
  filename: function (req, file, cb) {
  var datetimestamp = Date.now();
  cb(null,'part' + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  }
  });
  
  var upload = multer({ //multer settings
  storage: storage
  }).single('file');
  
  


exports.createOne = function(req, res) {
  var newParentPostCategory = new ParentPostCategory(req.body);

  var form = new formidable.IncomingForm();
/*
  upload(req,res,function(err){
    if(err){
    res.json({error_code:1,err_desc:err});
    return;
    }
    res.json({error_code:0,err_desc:null, output: req.file});
    });
*/

  /*
  form.parse(req, function(err, fields, files) {
    // `file` is the name of the <input> field of type `file`
    var old_path = files.file.path,
        file_size = files.file.size,
        file_ext = files.file.name.split('.').pop(),
        index = old_path.lastIndexOf('/') + 1,
        file_name = old_path.substr(index),
        new_path = path.join(process.env.PWD, '/uploads/', file_name + '.' + file_ext);

    fs.readFile(old_path, function(err, data) {
        fs.writeFile(new_path, data, function(err) {
            fs.unlink(old_path, function(err) {
                if (err) {
                  res.send(err);
                    //res.status(500);
                    //res.json({'success': false});
                } else {
                    res.status(200);
                    res.json({'success': true});
                    res.write('File uploaded and moved!');    
                }
            });
        });
    });
});

*/

  form.parse(req, function (err, fields, files) {
    var oldPath = files.file.path;
    var newPath = __dirname + '/uploads/' + files.file.name;


    fs.rename(oldPath, newPath, function (err) {
      if (err) {
        move(oldPath,newPath,function(err,success) {
          if (err) {
           //throw err; 
            res.send(err);
          }else{
            res.write('File uploaded and moved!');  
          }

        });
        

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

//end of upload

/*
exports.upload = function uploadMedia (req, res, next) { // This is just for my Controller same as app.post(url, function(req,res,next) {....
  var form = new formidable.IncomingForm()
  form.multiples = true
  form.keepExtensions = true
  form.uploadDir = uploadDir
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: err })
    res.status(200).json({ uploaded: true })
  })
  form.on('fileBegin', function (name, file) {
    const [fileName, fileExt] = file.name.split('.')
    file.path = path.join(uploadDir, `${fileName}_${new Date().getTime()}.${fileExt}`)
  })
}
*/



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


exports.getAllFiles = function(req, res) {
  if (err)
    res.send(err);
    res.json(res);
};

exports.getOneFile = function(req, res) {
  if (err)
    res.send(err);
    res.json(res);
};

function move(oldPath, newPath, callback) {

  fs.rename(oldPath, newPath, function (err) {
      if (err) {
          if (err.code === 'EXDEV') {
              copy();
          } else {
              callback(err,null);
          }
          return;
      }
      callback(null,'success');
  });

  function copy() {
      var readStream = fs.createReadStream(oldPath);
      var writeStream = fs.createWriteStream(newPath);


      readStream.pipe(writeStream);
      
      readStream.on('error', callback('error read stream'+oldPath,null));
      writeStream.on('error', callback('error write stream'+newPath,null));

      readStream.on('close', function () {
          fs.unlink(oldPath, callback(null,'success'));
      });

   
  }
}