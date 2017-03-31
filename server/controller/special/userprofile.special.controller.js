const User = require('../../model/user.model');
const Image = require('../../model/image.model');

function userProfile(req,res){
  let offset = req.query.offset || 0;
  let limit = req.query.limit || 13;
  let userName = req.params.userName.toLowerCase();
  User.findOne({'twitter.userName':userName})
    .select('_id')
    .then(user=>{
      if(!user){
        throw new Error(`User does not exist`);
      }
      return Image.find({userId:user._id})
        .limit(Number(limit))
        .skip(Number(offset))
        .populate('userId',{'twitter.userName':1,img:1,_id:0})
        .sort('-date');
    })
    .then(images=>{
      res.json(images);
    })
    .catch(err=>{
      res.status(500).json({message:err.message});
    })
}

function userProfileCount(req,res){
  let userName = req.params.userName.toLowerCase();
  User.findOne({'twitter.userName':userName})
    .select('_id')
    .then(user=>{
      if(!user){
        throw new Error(`User does not exist`);
      }
      return Image.count({userId:user._id})
    })
    .then(count=>{
      res.json({count:count});
    })
    .catch(err=>{
      res.status(500).json({message:err.message});
    })
}

module.exports = {
  userProfile,
  userProfileCount
};
