const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  like:{
    type:Boolean,
    default:true
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  imageId:{
    type:Schema.Types.ObjectId,
    ref:'Image',
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('Like',likeSchema);
