const passport = require('passport');
const twitterStrategy = require('passport-twitter').Strategy;

const User = require('../model/user.model');
const config = require('./config');

passport.use(new twitterStrategy(config.twitter,(token,tokenSecret,profile,cb)=>{
  User.findOne({'twitter.id':profile.id})
    .then(user=>{
      if(user!==null){
        return user;
      } else {
        let newUser = new User({
          displayName:profile.displayName,
          img:profile.photos[0].value,
          twitter:{
            id:profile.id,
            userName:profile.username
          }
        });
        return newUser.save();
      }
    })
    .then((user)=>{
      cb(null,user);
    })
    .catch(err=>{
      cb(err);
    })
}));

passport.serializeUser((user,cb)=>{
  cb(null,user);
});

passport.deserializeUser((id,cb)=>{
  User.findById(id,(err,user)=>{
    cb(err,user);
  });
})

console.log('passport is running');
