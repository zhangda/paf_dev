var mongoose = require('mongoose')

var categorySchema = new mongoose.Schema({
  name:{type:String, required: true},
  key:{type: String, required: true, index:{unique:true} },
  description:{type: String},
  isDisplay:{type:Boolean, default:true},
  expanded:{type:Boolean, default:true},
  displayOrder:Number,
  apis:[{type:mongoose.Schema.Types.ObjectId, ref:'Api'}]
})

module.exports = mongoose.model('Category', categorySchema);
