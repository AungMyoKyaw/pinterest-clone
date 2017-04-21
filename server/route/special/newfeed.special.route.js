const router = require('express').Router();
const newFeed = require('../../controller/special/newfeed.special.controller');

router.route('/new-feed')
      .get(newFeed.newFeed);

router.route('/count/new-feed')
      .get(newFeed.newFeedCount);

module.exports = router;
