const User = require('../../model/user.model');
const Image = require('../../model/image.model');
const Like = require('../../model/like.model')

function userProfile(req,res){
  let offset = req.query.offset || 0;
  let limit = req.query.limit || 13;
  let isAuth = req.isAuthenticated();
  let userName = req.params.userName.toLowerCase();
  let userId = '';
  User.findOne({'twitter.userName':userName})
    .select('_id')
    .then(user=>{
      if(!user){
        throw new Error(`User does not exist`);
      }
      userId = user._id;
      return Image.find({userId:user._id})
        .limit(Number(limit))
        .skip(Number(offset))
        .populate('userId',{'twitter.userName':1,img:1,_id:0})
        .sort('-date')
        .lean();
    })
    .then(images=>{
      if(isAuth){
      return (
        Promise.all(images.map(image=>{
          return liked(image,userId);
        }))
        .then(images=>{
          return images;
        }));
      } else {
        return images;
      }
    })
    .then(resData=>{
      res.json(resData);
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

function liked(image,userID){
  return new Promise((resolve,reject)=>{
    Like.findOne({
      userId:userID,
      imageId:image._id
    })
    .select('like')
    .sort('-_id')
    .then(like=>{
      if(like!==null && like.like){
        image.liked = true;
        resolve(image);
      } else {
        image.liked = false;
        resolve(image);
      }
    })
    .catch(err=>{
      reject(err);
    });
  })
}

module.exports = {
  userProfile,
  userProfileCount
};
