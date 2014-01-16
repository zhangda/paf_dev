var mongoose = require('mongoose')

var categorySchema = new mongoose.Schema({
  name:{type:String, required: true},
  key:{type: String, required: true, index:{unique:true} },
  isDisplay:{type:Boolean, default:true},
  expended:{type:Boolean, default:true},
  displayOrder:Number,
  apis:[{type:mongoose.Schema.Types.ObjectId, ref:'Api'}]
})

module.exports = mongoose.model('Category', categorySchema);
