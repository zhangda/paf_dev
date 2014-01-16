var mongoose = require('mongoose')

var apiSchema = new mongoose.Schema({
   _category: {type:String, ref: 'Category'},
   name: {type:String,required:true},
   key: {type:String, required:true,  index:{unique:true}},
   description:String,
   request:{body:String,
            headers:[{name:String,value:String,isRequired:Boolean,description:String}],
            params:[{name:String,value:String,isRequired:Boolean,description:String}]},
   response:{body:String,
            headers:[{name:String,value:String,isRequired:Boolean,description:String}],
            params:[{name:String,value:String,isRequired:Boolean,description:String}]},
   example:{postCommand:String, request:String, response:String},
   questions:[{question:String, answer:String}]

})

module.exports = mongoose.model('Api', apiSchema);
