const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username:String,
  img:String,
  twitter:{
    id:{
      type:String,
      required:true
    },
    name:String,
  }
});

module.exports = mongoose.model('User',userSchema);
