const express = require('express');
const router = express.Router();

const commissaireCtrl = require('../../controllers/gestionCompte/commissaireController');

const logMiddleware = require('../../controllers/gestionLog/logController');
router.use((req, res, next) => {
  req.table = 'COMMISSAIRE PRISEURS';
  next();
});

/**
 * @swagger
 * components:
 *   schemas:
 *     commissaire:
 *       type: object
 *       required:
 *         - user
 *       properties:
 *         nombreEnchereOrganisee:
 *           type: Number
 *           description: Nombre d'encheres organisees par le commissaire
 *         user:
 *           type: string
 *           description: L'utilisateur auquel correspond le commissaire
 *
 */
/**
 * @swagger
 * tags:
 *   name: commissaire
 *   description: Routes de l'API pour la gestion des commissaires
 */

/**
 * @swagger
 * /api/commissaires/:
 *   get:
 *     summary: Retourne une liste de tout les commissaires
 *     tags: [Commissaire]
 *     responses:
 *       200:
 *         description: La liste de tout les commissaires
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Commissaire'
 *       400:
 *         description: Une erreur s'est produite
 */
router.get('/', commissaireCtrl.getAllCommissaire);
/**
 * @swagger
 * /api/produits/:
 *   post:
 *     summary: Creer un commissaire
 *     tags: [Commissaire]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Commissaire'
 *     responses:
 *       201:
 *         description: Le commissaire a été crée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commissaire'
 *       400:
 *         description: Une erreur s'est produite
 */
router.post('/', logMiddleware.createLog, commissaireCtrl.createCommissaire);
/**
 * @swagger
 * /api/commissaires/{id}:
 *   get:
 *     summary: Retrouver un commissaire par son Id
 *     tags: [Commissaire]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: l'id du commissaire
 *     responses:
 *       200:
 *         description: Le commissaire a été récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commissaire'
 *       400:
 *         description: Une erreur s'est produite
 */
router.get('/:id', commissaireCtrl.getOneCommissaire);
/**
 * @swagger
 * /api/commissaire/{id}:
 *  put:
 *    summary: Mettre à jour le commissaire par son Id
 *    tags: [Commissaire]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: L'id du commissaire
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Commissaire'
 *    responses:
 *      200:
 *        description: Le commissaire a été modifié  avec succès
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Commissaire'
 *      400:
 *        description: Une erreur s'est produite
 */
router.put(
  '/:id',
  logMiddleware.createLog,
  commissaireCtrl.updateOneCommissaire,
);
/**
 * @swagger
 * /api/commissaires/{id}:
 *   delete:
 *     summary: Supprimer un commissaire par son Id
 *     tags: [Commissaire]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id du commissaire
 *
 *     responses:
 *       200:
 *         description: Le commissaire a été supprimé avec succès
 *       400:
 *         description: Une erreur s'est produite
 */
router.delete(
  '/:id',
  logMiddleware.createLog,
  commissaireCtrl.deleteOneCommissaire,
);

module.exports = router;
