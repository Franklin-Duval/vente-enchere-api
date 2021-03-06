const Log = require('../../models/gestionLog/log');

exports.getAllLog = (req, res) => {
  Log.find({})
    .then((lots) => {
      res.status(200).json({
        success: true,
        message: 'Les lots ont été récupérés avec succès',
        result: lots,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Une s'est produite",
        result: undefined,
      });
    });
};

exports.createLog = (req, res, next) => {
  const log = new Log({
    date_creation: new Date().toISOString(),
    action: req.method,
    createur: 'Anonyme',
    table: req.table,
  });
  log
    .save()
    .then(() => {
      next();
    })
    .catch((error) => {
      console.log(error);
      next();
    });
};
