const Image = require('../model/image.model');
const Like = require('../model/like.model');

function newFeed(req,res){
  let offset = req.query.offset || 0;
  let limit = req.query.limit || 13;
  let userId = req.user._id;
  Image.find()
    .limit(Number(limit))
    .skip(Number(offset))
    .populate('userId',{'twitter.userName':1,img:1,_id:0})
    .sort('-like -date')
    .lean()
    .then(newFeed=>{
      Promise.all(newFeed.map(image=>{
        return liked(image,userId);
      }))
      .then(newfeed=>{
        res.json(newfeed);
      })
      .catch(err=>{
        throw err;
      })
    })
    .catch(err=>{
      res.json({message:err.message});
    })
}

function newFeedCount(req,res){
  Image.count()
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
  newFeed,
  newFeedCount
};
