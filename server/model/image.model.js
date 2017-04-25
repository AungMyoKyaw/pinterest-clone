const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const http = require('http');
const https = require('https');

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
  },
  broken:{
    type:Boolean,
    default:false
  }
})

imageSchema.pre('save',function(next){
  let isUrl = /^http:\/\//.test(this.url);
  let isUrls = /^https:\/\//.test(this.url);
  let url = isUrl || isUrls ? this.url : 'http://AungMyoKyaw';
  if(isUrls){
    https.get(url,res=>{
      if(res.statusCode == '200'){
        next();
      } else {
        this.url = "http://placehold.it/350x100?text=Broken+image!";
        next();
      }
    }).on('error',e=>{
      this.url = "http://placehold.it/350x100?text=Broken+image!";
      this.broken = true;
      next();
    })
  } else if(isUrl){
    http.get(url,res=>{
      const { statusCode } = res;
      if(statusCode == '200'){
        next();
      } else {
        this.url = "http://placehold.it/350x100?text=Broken+image!";
        next();
      }
    }).on('error',e=>{
      this.url = "http://placehold.it/350x100?text=Broken+image!";
      this.broken = true;
      next();
    })
  }
})

module.exports = mongoose.model('Image',imageSchema);
