const User = require('../models/user');

exports.getAllUser = (req, res, next) => {
    User.find({}).then(
      (users) => {
        res.status(200).json({
          success: true,
          message: "Les utilisateurs ont été récuppérés avec succès",
          result: users,
        });
      }
    ).catch(
      (error) => {
        console.log(error);
        res.status(400).json({
          success: false,
          message: "Une erreur s'est produite",
          result: undefined,
        });
      }
    );
};

exports.getOneUser = (req, res, next) => {
    User.findOne({_id: req.params.id}).then(
      (user) => {
        res.status(200).json({
          success: true,
          message: "L'utilisateur a été récuppéré avec succès",
          result: user,
        });
      }
    ).catch(
      (error) => {
        console.log(error);
        res.status(400).json({
          success: false,
          message: "Une erreur s'est produite",
          result: undefined,
        });
      }
    );
};

exports.createUser = (req, res, next) => {
    const { nom, prenom, adresse, contact, dateAjout } = req.body;

    const user = new User({
      nom,
      prenom,
      adresse,
      contact,
      dateAjout,
    });

    user.save().then(
      () => {
        res.status(201).json({
          success: true,
          message: "L'utilisateur a été enregistré avec succès",
          result: user,
        });
      }
    ).catch(
      (error) => {
        console.log(error);
        res.status(400).json({
          success: false,
          message: "Une erreur s'est produite",
          result: undefined,
        });
      }
    );

};

exports.updateOneUser = (req, res, next) => {

    const user = new User({
      _id: req.params.id,
      nom: req.body.nom,
      prenom: req.body.prenom,
      adresse: req.body.adresse,
      contact: req.body.contact,
      dateAjout: req.body.dateAjout
    });

   
    User.updateOne({_id: req.params.id}, user).then(
      () => {
        res.status(200).json({
          success: true,
          message: "L'utilisateur a été modifié avec succès",
          result: user,
        });
      }
    ).catch(
      (error) => {
        console.log(error);
        res.status(400).json({
          success: false,
          message: "Une erreur s'est produite",
          result: undefined,
        });
      }
    );
};

exports.deleteOneUser = (req, res, next) => {

    User.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          success: true,
          message: "L'utilisateur a été supprimé avec succès",
        });
      }
    ).catch(
      (error) => {
        console.log(error);
        res.status(400).json({
          success: false,
          message: "Une erreur s'est produite",
        });
      }
    );
}

