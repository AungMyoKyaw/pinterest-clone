const router = require('express').Router();
const isAuth = require('../../controller/special/isAuth.special.controller');

router.route('/isauth')
      .get(isAuth);

module.exports = router;
