const router = require('express').Router();
const userProfile = require('../controller/userprofile.controller');

router.route('/profile/:userName')
      .get(userProfile.userProfile);

router.route('/count/profile/:userName')
      .get(userProfile.userProfileCount);

module.exports = router;
