const router = require('express').Router();
const newFeed = require('../controller/newfeed.controller');

router.route('/new-feed')
      .get(newFeed.newFeed);

router.route('/count/new-feed')
      .get(newFeed.newFeedCount);

module.exports = router;
