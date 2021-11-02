const express = require('express');
const multer = require('multer');
const Land = require('../models/land');
const GridFSService = require('../services/gridfsServices');

const router = express.Router();

const upload = multer({ dest: '/tmp' });
router.use(upload.single('image'));

router.get('/:id', async (req, res) => {
  let imageId = req.params.id;
  try {
    const downStream = await new GridFSService().getFile(imageId);
    res.setHeader('Content-Type', 'image/jpeg');
    downStream.pipe(res);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Aucune image avec cet identifiant n'existe",
      result: undefined,
    });
  }
});

router.post('/', async (req, res) => {
  const image = req.file;
  let fileUploaded = undefined;
  if (image) {
    fileUploaded = await new GridFSService().uploadFile(
      image.path,
      image.originalname,
      {
        contentType: image.mimetype,
      },
    );
  }
  res.json({
    success: false,
    message: "L'image a été ajoutée avec succès",
    result: {},
  });
  // Land.findOne({ _id: req.body.landId }, function (err, land) {
  //   if (err) {
  //     res.json({
  //       success: false,
  //       message: "Une erreur s'est produite",
  //       result: undefined,
  //     });
  //   } else {
  //     land.images.push(fileUploaded._id.toHexString());
  //     land.save();

  //     res.json({
  //       success: false,
  //       message: "L'image a été ajoutée avec succès",
  //       result: land,
  //     });
  //   }
  // });
});

router.delete('/:id', async (req, res) => {
  try {
    let imageId = req.params.id;
    await new GridFSService().deleteFile(imageId);

    res.status(201).json({
      success: true,
      message: "L'image a été supprimé avec succès",
      result: undefined,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Aucune image avec cet identifiant n'existe",
      result: undefined,
    });
  }
});

module.exports = router;
