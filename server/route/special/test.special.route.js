const router = require('express').Router();
const specialTest = require('../../controller/special/test.special.controller');

router.route('/special/test')
      .get(specialTest);

module.exports = router;
