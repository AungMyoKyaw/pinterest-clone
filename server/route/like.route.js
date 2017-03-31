const router = require('express').Router();
const like = require('../controller/like.controller');

router.route('/like')
      .post(like.likeImage);

module.exports = router;
