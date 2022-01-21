const express = require('express');
const router = express.Router();

const lotCtrl = require('../../controllers/gestionProduit/lotController');
const logMiddleware = require('../../controllers/gestionLog/logController');
router.use((req, res, next) => {
  req.table = 'LOTS';
  next();
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Lot:
 *       type: object
 *       required:
 *         - statut
 *         - prixMin
 *         - produits
 *         - dateReception
 *       properties:
 *         prixFinalVente:
 *           type: string
 *           description: Prix final de la vente du lot
 *         statut:
 *           type: string
 *           description: chaine indiquant l'état du lot (vendu, en solde etc)
 *         prixMin:
 *           type: string
 *           description: Prix minimal de vente du lot
 *         nonVendu:
 *           type: boolean
 *           description: Booléen indiquant si le lot est vendu ou pas
 *         dateMiseEnchere:
 *           type: string
 *           format: date-time
 *           description: Date de mise en enchère du lot
 *         produits:
 *           type: array
 *           items:
 *               type: string
 *           description: Array des id des produits constituant le lot
 *         commentaireRefus:
 *           type: string
 *           description: Commentaire de refus du lot
 *         dateRefus:
 *           type: string
 *           format: date-time
 *           description: La date de refus du lot
 *         dateReception:
 *            type: string
 *            format: date-time
 *            description: La date de réception du lot
 *
 *
 */

/**
 * @swagger
 * tags:
 *   name: Lot
 *   description: Routes de l'API pour la gestion des lots
 */

/**
 * @swagger
 * /api/lots/:
 *   get:
 *     summary: Retourne une liste de tout les lots
 *     tags: [Lot]
 *     responses:
 *       200:
 *         description: La liste de tout les lots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lot'
 *       400:
 *         description: Une erreur s'est produite
 */
router.get('/', lotCtrl.getAllLot);

/**
 * @swagger
 * /api/lots/:
 *   post:
 *     summary: Creer un lot
 *     tags: [Lot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lot'
 *     responses:
 *       201:
 *         description: Le lot a été crée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lot'
 *       400:
 *         description: Une erreur s'est produite
 */
router.post('/', logMiddleware.createLog, lotCtrl.createLot);

/**
 * @swagger
 * /api/lots/{id}:
 *   get:
 *     summary: Retrouver un lot par son Id
 *     tags: [Lot]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: l'id du lot
 *     responses:
 *       200:
 *         description: Le lot a été récuppéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/lot'
 *       400:
 *         description: Une erreur s'est produite
 */
router.get('/:id', lotCtrl.getOneLot);

/**
 * @swagger
 * /api/lots/{id}:
 *  put:
 *    summary: Mettre à jour le lot par son Id
 *    tags: [Lot]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: L'id du lot
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Lot'
 *    responses:
 *      200:
 *        description: Le lot a été modifié  avec succès
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Lot'
 *      400:
 *        description: Une erreur s'est produite
 */
router.put('/:id', logMiddleware.createLog, lotCtrl.updateOneLot);

/**
 * @swagger
 * /api/lots/{id}:
 *   delete:
 *     summary: Supprimer un lot par son Id
 *     tags: [Lot]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id du Lot
 *
 *     responses:
 *       200:
 *         description: Le lot a été supprimé avec succès
 *       400:
 *         description: Une erreur s'est produite
 */
router.delete('/:id', logMiddleware.createLog, lotCtrl.deleteOneLot);

/**
 * @swagger
 * /api/lots/vendeur/{id}:
 *   get:
 *     summary: Retrouver les lots d'un vendeur par son id
 *     tags: [Lot]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: l'id du vendeur
 *     responses:
 *       200:
 *         description: Les lots ont été récuppérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/lot'
 *       400:
 *         description: Une erreur s'est produite
 */
router.get('/vendeur/:id', lotCtrl.getAllLotByVendeur);

/**
 * @swagger
 * /api/lots/produit/{id}:
 *   get:
 *     summary: Retrouver les lots contenant un produit par son id
 *     tags: [Lot]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: l'id du produit
 *     responses:
 *       200:
 *         description: Les lots ont été récuppérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/lot'
 *       400:
 *         description: Une erreur s'est produite
 */
router.get('/produit/:id', lotCtrl.getAllLotByProduit);

module.exports = router;
