const multer = require('multer');
const GridFSService = require('../services/gridfsService');
const express = require('express');

const router = express.Router();

const upload = multer({ dest: '/tmp' });
router.use(upload.array('image'));

router.use(async (req, res, next) => {
  const images = req.files;
  let uploadedImages = [];
  if (images) {
    for (let image of images) {
      let fileUploaded = undefined;
      if (image) {
        fileUploaded = await new GridFSService().uploadFile(
          image.path,
          image.originalname,
          {
            contentType: image.mimetype,
          },
        );
        uploadedImages.push(fileUploaded);
      }
    }
    if (uploadedImages.length == 0) {
      next();
    } else {
      req.uploadedImages = uploadedImages;
      next();
    }
  } else {
    res.status(400).send('Aucune image: erreur');
  }
});

module.exports = router;
