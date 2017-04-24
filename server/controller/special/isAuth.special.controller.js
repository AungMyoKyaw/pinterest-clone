function isAuth(req,res){
  if(req.isAuthenticated()){
    res.json({username:req.user.twitter.userName});
  } else {
    res.sendStatus(401);
  }
}

module.exports = isAuth;
