const Image = require('../../model/image.model');

function newFeed(req,res){
  let offset = req.query.offset || 0;
  let limit = req.query.limit || 13;
  Image.find()
    .limit(Number(limit))
    .skip(Number(offset))
    .populate('userId',{'twitter.userName':1,img:1,_id:0})
    .sort('-like -date')
    .then(newFeed=>{
      res.json(newFeed)
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

module.exports = {
  newFeed,
  newFeedCount
};
