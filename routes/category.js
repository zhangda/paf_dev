var Category = require('../models/category.js');
var Api = require('../models/api.js')

exports.post = function(req, res){
  new Category(req.body).save(function(err, category){
    if(err) return res.json(400,{info:{code:'',message:err.err}})
    return res.json(category)
  })
}

exports.list = function(req, res){
  Category.find().populate({path:'apis',select:'name key'}).exec(function(err,categories){
    if(err) return res.json(400,{info:{code:'',message:err.err}})
    return res.json(categories)
  })
}

exports.remove = function(req, res){
  Category.findById(req.params.id)
   .populate({path:'apis', select:'_id'}).exec(function(err,category){
     if(err) return res.json(400,{info:{code:'',message:err.err}})
     if(category.apis.length>0){
       return res.json(400,{info:{code:'',message:'category is not empty'}})
     } else {
       Category.findByIdAndRemove(req.params.id, function(err,category){
       if(err) return res.json(400,{info:{code:'',message:err.err}})
       return res.json(category)
     })}
  })
}

exports.get = function(req, res){
  Category.findOne({'key':req.params.key}).exec(function(err,category){
    if(err) return res.json(400,{info:{code:'',message:err.err}})
    return res.json(category)
  })
}

exports.update = function(req,res){
  Category.findByIdAndUpdate(req.params.id, req.body, function(err, category){
    if(err) return res.json(400,{info:{code:'',message:err.err}})
    return res.json(category)
  })
}

/*
exports.query = function(req,res){
  Category.find(req.query, function(err, categories){
    if(err) return res.json({err:err})
    return res.json(categories)
  })
}
*/

exports.query = function(req, res){
  var queryString = []
  for(var i in req.query){
   var item ={};
   item[i] =req.query[i];
   queryString.push(item);
  }
  Category.find({$or:queryString}, function(err, categories){
    if(err) return res.json(400,{info:{code:'',message:err.err}})
    return res.json(categories)
  })
}

