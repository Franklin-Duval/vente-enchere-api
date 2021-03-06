const express = require('express');
const router = express.Router();

const compteCtrl = require('../../controllers/gestionCompte/compteController');

const logMiddleware = require('../../controllers/gestionLog/logController');
router.use((req, res, next) => {
  req.table = 'COMPTES';
  next();
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Compte:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: email lié au compte
 *         password:
 *           type: string
 *           description: Le mot de passe du compte
 *         isActivated:
 *           type: boolean
 *           description: L'etat du compte (actif ou pas)
 */

/**
 * @swagger
 * tags:
 *   name: Compte
 *   description: Routes de l'API pour la gestion des comptes
 */
/**
 * @swagger
 * /api/comptes/:
 *   get:
 *     summary: Retourne une liste de tout les comptes
 *     tags: [Compte]
 *     responses:
 *       200:
 *         description: La liste de tout les comptes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Compte'
 *       400:
 *         description: Une erreur s'est produite
 */

router.get('/', compteCtrl.getAllCompte);
/**
 * @swagger
 * /api/produits/:
 *   post:
 *     summary: Creer un compte
 *     tags: [Compte]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Compte'
 *     responses:
 *       201:
 *         description: Le compte a été crée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compte'
 *       400:
 *         description: Une erreur s'est produite
 */
router.post('/', logMiddleware.createLog, compteCtrl.createCompte);
/**
 * @swagger
 * /api/comptes/{id}:
 *   get:
 *     summary: Retrouver un compte par son Id
 *     tags: [Compte]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: l'id du compte
 *     responses:
 *       200:
 *         description: Le compte a été récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compte'
 *       400:
 *         description: Une erreur s'est produite
 */
router.get('/:id', compteCtrl.getOneCompte);
/**
 * @swagger
 * /api/compte/{id}:
 *  put:
 *    summary: Mettre à jour le compte par son Id
 *    tags: [Compte]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: L'id du compte
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Compte'
 *    responses:
 *      200:
 *        description: Le compte a été modifié  avec succès
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Compte'
 *      400:
 *        description: Une erreur s'est produite
 */

router.put('/:id', logMiddleware.createLog, compteCtrl.updateOneCompte);
/**
 * @swagger
 * /api/comptes/activate-compte/{id}:
 *   get:
 *     summary: Retrouver un compte par son Id parmi les comptes actifs uniquement
 *     tags: [Compte]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: l'id du compte actif
 *     responses:
 *       200:
 *         description: Le compte actif a été récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compte'
 *       400:
 *         description: Une erreur s'est produite
 */
router.get('/activate-compte/:id', compteCtrl.activateCompte);
/**
 * @swagger
 * /api/compte/change-password/{id}:
 *  put:
 *    summary: Mettre à jour le mot de pas d'un compte par son Id
 *    tags: [Compte]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: L'id du compte
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Compte'
 *    responses:
 *      200:
 *        description: Le mot de passe du compte a été modifié  avec succès
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Compte'
 *      400:
 *        description: Une erreur s'est produite
 */
router.put(
  '/change-password/:id',
  logMiddleware.createLog,
  compteCtrl.changePassword,
);
/**
 * @swagger
 * /api/comptes/{id}:
 *   delete:
 *     summary: Supprimer un compte par son Id
 *     tags: [Compte]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id du Compte
 *
 *     responses:
 *       200:
 *         description: Le compte a été supprimé avec succès
 *       400:
 *         description: Une erreur s'est produite
 */
router.delete('/:id', logMiddleware.createLog, compteCtrl.deleteOneCompte);

module.exports = router;
