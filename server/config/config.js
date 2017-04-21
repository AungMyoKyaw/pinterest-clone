//get env Name from commandLine
let envName = process.argv[2] ? process.argv[2] : 'development';

//get env Name from process.env
envName = process.env.NODE_ENV || 'development';

//config
let config = {
  development:{
    db:'mongodb://pinterest-clone:BQHiSU55D89k1Uyb34Ez@ds121190.mlab.com:21190/pinterest-clone',
    port:4444,
    session:{
      secret:'ilovejs',
      resave:true,
      saveUninitialized:true
    },
    twitter:{
      consumerKey:'YIUeY2FlhhUi04WpAcooEDriI',
      consumerSecret: 'J1jhmb0MSQgMsiL8OdDJz6lKgouoDvgc0GvYcolx8dQauLvjHO',
      callbackURL: '/auth/twitter/callback'
    }
  },
  production:{
    db:process.env.PIC_DB,
    port:process.env.PORT || 80,
    session:{
      secret:'ilovejs',
      resave:true,
      saveUninitialized:true
    },
    twitter:{
      consumerKey:process.env.twitter_key,
      consumerSecret:process.env.twitter_secret,
      callbackURL: '/auth/twitter/callback'
    }
  }
}

module.exports = config[envName];
