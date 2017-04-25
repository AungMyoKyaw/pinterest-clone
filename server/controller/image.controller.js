const Image = require('../model/image.model');
const Like = require('../model/like.model');

function postImage(req,res){
  let image = req.body;
  image.userId = req.user._id;
  let newImage = new Image(image);
  newImage.save()
    .then(image=>{
      res.json(image);
    })
    .catch(err=>{
      res.json({message:err.message})
    });
}

function deleteImage(req,res){
  let imageId = req.params.imageId;
  let userId = req.user._id;
  Image.findById(imageId)
    .then(image=>{
      if(image.userId+''==userId){
        return image.remove();
      } else {
        throw Error('WTF');
      }
    })
    .then(removed=>{
      res.json({message:'Successfully removed.'});
    })
    .catch(err=>{
      res.status(500).json({message:err.message});
    });
}

function editImage(req,res){
  let imageId = req.params.imageId;
  Image.findById(imageId)
    .then(image=>{
      Object.keys(req.body).forEach(key=>{
        image[key] = req.body[key];
      });
      return image.save()
    })
    .then(image=>{
      res.json(image);
    })
    .catch(err=>{
      res.status(500).json({message:err.message});
    })
}

function searchImage(req,res){
  let offset = req.query.offset || 0;
  let limit = req.query.limit || 22;
  let keyword =new RegExp(req.query.keyword,'i');
  let userId = req.user._id;
  Image.find({description:keyword})
    .limit(Number(limit))
    .skip(Number(offset))
    .populate('userId',{'twitter.userName':1,img:1,_id:0})
    .sort('-like -date')
    .lean()
    .then(images=>{
      Promise.all(images.map(image=>{
        return liked(image,userId)
      }))
      .then(resData=>{
        res.json(resData);
      })
      .catch(err=>{
        throw err;
      })
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
  postImage,
  editImage,
  deleteImage,
  searchImage
}

//postImage
// {
//   url:'',
//   description:''
// }
