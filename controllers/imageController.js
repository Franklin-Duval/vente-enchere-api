const GridFSService = require('../services/gridfsService');

exports.getOneImage = async (req, res) => {
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
};

exports.deleteOneImage = async (req, res) => {
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
};
