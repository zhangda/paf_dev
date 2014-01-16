var Category = require('../models/category.js');
var Api = require('../models/api.js')

exports.post = function(req, res){
  new Category(req.body).save(function(err){
    if(err) return res.json({err:err})
    return res.json({ok:'ok'})
  })
}

exports.list = function(req, res){
  Category.find().populate({path:'apis',select:'name key'}).exec(function(err,categories){
    if(err) return res.json({err:err})
    return res.json(categories)
  })
}

exports.remove = function(req, res){
  Category.findOne({'key':req.params.key})
   .populate({path:'apis', select:'_id'}).exec(function(err,category){
     if(err) return res.json({err:err})
     if(category.apis.length>0) return res.json({err:'category is not empty'})
     Category.remove({'key':req.params.key}, function(err,category){
       if(err) return res.json({err:err})
       return res.json({ok:'ok'})
     })
  })
}

