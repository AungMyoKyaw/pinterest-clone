const router = require('express').Router();
const image = require('../controller/image.controller');

router.route('/image')
      .post(image.postImage);

router.route('/image/:imageId')
      .put(image.editImage)
      .delete(image.deleteImage);

module.exports = router;
