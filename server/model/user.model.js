const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  displayName:String,
  img:String,
  twitter:{
    id:{
      type:String,
      required:true
    },
    userName:{
      type:String,
      lowercase:true
    }
  }
});

module.exports = mongoose.model('User',userSchema);
