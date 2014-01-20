var Api = require('../models/api');
var Category = require('../models/category')

exports.post = function(req, res){
  var api = new Api(req.body)
  Category.findById(req.body._category, function(err,category){
    if(err) return res.json({err:err})
    api.save(function(err, api){
       if(err) return res.json({err:err})
       category.apis.push(api)
       category.save(function(err, category){
         if(err) return res.json({err:err})
         return res.json(api)
       })
    })  
  })
}

exports.get = function(req, res){
  Api.findOne({'key':req.params.key}, function(err,api){
    if(err) return res.json({err:err})
    return res.json(api)
  })
}

exports.remove = function(req,res){
  Api.findByIdAndRemove(req.params.id, function(err,api){
    if(err) return res.json({err:err})
    return res.json(api)
    })
}

exports.list = function(req,res){
  Api.find().select('name key').exec(function(err,apis){
    if(err) return res.json({err:err})
    return res.json(apis)
  })
}

exports.update = function(req,res){
  Api.findByIdAndUpdate(req.params.id, req.body, function(err, api){
    if(err) return res.json({err:err})
    return res.json(api)
  })
}

/*
exports.query = function(req, res){
  Api.find(req.query, function(err, apis){
    if(err) return res.json({err:err})
    return res.json(apis)
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
  Api.find({$or:queryString}, function(err, apis){
    if(err) return res.json({err:err})
    return res.json(apis)
  })  
}

