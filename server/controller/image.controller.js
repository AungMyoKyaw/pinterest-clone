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
  Image.findByIdAndRemove(imageId)
    .then(removed=>{
      res.json({message:'Successfully removed.'});
    })
    .catch(err=>{
      res.status(500).json({message:err.message});
    })
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

module.exports = {
  postImage,
  editImage,
  deleteImage
}

//postImage
// {
//   url:'',
//   description:''
// }
