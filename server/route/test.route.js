const router = require('express').Router();
const test = require('../controller/test.controller');

router.route('/test')
      .get(test);

module.exports = router;
