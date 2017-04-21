const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const passport = require('passport');
const glob = require('glob');
const path = require('path');
const morgan = require('morgan');

const app = express();

const config = require('./server/config/config');
const db = config.db;
const port = config.port;
const sessionConfig = config.session;

//connect to database
mongoose.connect(db);
let connection = mongoose.connection;
connection.on('error',()=>{
  console.log(`Error on connecting ${db}`);
});
connection.once('open',()=>{
  console.log(`My app is using ${db}`);
});
connection.on('disconnected',()=>{
  console.log(`Successfully disconnected from ${db}`);
});
process.on('SIGINT',()=>{
  connection.close(()=>{
    process.exit(0);
  });
});

// enable cors
app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//needed middleware
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser(sessionConfig.secret));
app.use(session(sessionConfig));
app.use(morgan('dev'));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//start passport
require('./server/config/passport');
app.get('/auth/twitter',passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
  passport.authenticate('twitter',{failureRedirect:'/login'}),
  (req,res)=>{
    res.redirect('/');
  }
);
app.get('/logout',(req,res)=>{
  req.logout();
  res.send('Logout');
})

//launch angular
app.use(express.static(__dirname+'/dist'));

//special API List
const specialRouteList = glob.sync('./server/route/special/*.js');
specialRouteList.forEach(specialRouteList=>{
  app.use('/special/api',require(specialRouteList));
})

//authentication middleware
app.use('/api/*',(req,res,next)=>{
  if(req.isAuthenticated()){
    next();
  } else {
    res.sendStatus(401);
  }
})

//api list
const routeList = glob.sync('./server/route/*.js');
routeList.forEach(route=>{
  app.use('/api',require(route));
})

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'dist/index.html'));
})

//starting app
app.listen(port,()=>{
  console.log(`My app is running on port ${port}`);
})
