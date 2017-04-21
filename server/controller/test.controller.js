function test(req,res){
  res.json(req.user);
}

module.exports = test;

// {
//   "_id": "",
//   "username": "",
//   "img": "",
//   "twitter": {
//     "id": "",
//     "name": ""
//   }
// }
