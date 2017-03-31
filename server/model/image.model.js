const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  description:{
    type:String,
    trim:true
  },
  url:{
    type:String,
    required:true
  },
  like:{
    type:Number,
    default:0,
    min:0
  },
  date:{
    type:Date,
    default:Date.now
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
})

module.exports = mongoose.model('Image',imageSchema);
