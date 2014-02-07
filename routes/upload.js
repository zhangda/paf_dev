var fs = require('fs')
var path = require('path')

exports.post = function(req, res){
  var upload_path = req.files.file.path
  var download_path = 'public/download/' + req.files.file.originalFilename
  var display_path = 'download/' + req.files.file.originalFilename
 
  fs.readFile(upload_path, function(err, data){
     if(err) return res.json(400,{info:{code:'',message:err.err}})
     fs.writeFile(download_path, data, function(err){
       if(err) return res.json(400,{info:{code:'',message:err.err}})
       return res.json(200, {url:display_path})
     })
  })
}
