const async = require('async');

const Like = require('../model/like.model');
const Image = require('../model/image.model');

function likeImage(req,res){
  let like = req.body;
  like.userId = req.user._id;
  let resData = {};
  Like.findOne({
      userId:req.user._id,
      imageId:like.imageId
    })
    .sort('-_id')
    .then(likeRecord=>{
      if(likeRecord){
        like.like = !likeRecord.like;
      } else {
        like.like = true;
      }
      let newLike = new Like(like);
      return newLike.save()
    })
    .then(like=>{
      resData.like = like;
      return Image.findById(like.imageId);
    })
    .then(image=>{//like plus
      like.like ? image.like++ : image.like--;
      if(image.like>=0){
        return image.save();
      } else {
        image.like = 0;
        return image.save();
      }
    })
    .then(likeplus=>{
      resData.likeplus = likeplus;
      res.json(resData);
    })
    .catch(err=>{
      res.status(500).json({message:err.message});
    });
}

module.exports = {
  likeImage
}


//like Image
// {
//   imageId:'';
// }
