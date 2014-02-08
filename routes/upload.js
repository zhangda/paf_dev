var formidable = require('formidable')
 
exports.post = function(req, res){
  var form = new formidable.IncomingForm();
  var upload_dir = "public/download/"
  form.on('error', function(err) { 
    return res.json(400,{code:'',message:err})
  })
  form.parse(req, function(err, fields, files) {
      if(err) return res.json(400,{info:{code:'',message:err}})
      else return res.json(200,{path:'/download/'+files.file.name})
  })
  form.on('fileBegin', function(name, file){
    file.path = upload_dir + file.name
  })
}

