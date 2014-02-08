var fs = require('fs')
var path = require('path')
var formidable = require('formidable')
var util = require('util');
 
exports.post = function(req, res){
  /*var upload_path = req.files.file.path
  var download_path = 'public/download/' + req.files.file.originalFilename
  var display_path = 'download/' + req.files.file.originalFilename
 
  fs.readFile(upload_path, function(err, data){
     if(err) return res.json(400,{info:{code:'',message:err.err}})
     fs.writeFile(download_path, data, function(err){
       if(err) return res.json(400,{info:{code:'',message:err.err}})
       return res.json(200, {url:display_path})
     })
  })*/
  var form = new formidable.IncomingForm();
  var upload_dir = "public/download/"
  form.uploadDir = upload_dir;
  form.on('error', function(err) { 
    return res.json(400,{code:'',message:err})
  })
  form.parse(req, function(err, fields, files) {
      if(err) return res.json(400,{info:{code:'',message:err}})
      else{ //console.log(util.inspect({fields: fields, files: files}))
      return res.json(200,{path:'/download/'+files.file.name})
    }
  });
  form.on('end', function(fields, files){
     var old_path = this.openedFiles[0].path
     var file_name = this.openedFiles[0].name
    fs.rename(old_path,upload_dir+file_name, function(err){
      if(err) return res.json(400,{info:{code:'',message:err}})
    })
  })
}

