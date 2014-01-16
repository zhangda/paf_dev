var Api = require('../models/api');
var Category = require('../models/category')

exports.post = function(req, res){
  var api = new Api(req.body)
  Category.findOne({'_id':req.body._category}, function(err,category){
    if(err) return res.json({err:err})
    api.save(function(err){
       if(err) return res.json({err:err})
       category.apis.push(api)
       category.save(function(err){
         if(err) return res.json({err:err})
         return res.json({ok:'ok'})
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
  Api.remove({'key':req.params.key}, function(err,api){
    if(err) return res.json({err:err})
    return res.json({ok:'ok'})
    })
}

