function test(req,res){
  res.json(req.user);
}

module.exports = test;
