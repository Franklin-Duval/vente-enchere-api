const express = require('express');
const router = express.Router();

const imageMiddleware = require('../../middlewares/imageMiddleware');

const produitCtrl = require('../../controllers/gestionProduit/produitController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Produit:
 *       type: object
 *       required:
 *         - nom
 *         - description
 *         - vendeur
 *         - category
 *         - estBio
 *         - statut
 *       properties:
 *         nom:
 *           type: string
 *           description: Le nom du produit
 *         description:
 *           type: string
 *           description: La description du produit
 *         vendeur:
 *           type: string
 *           description: L'id du vendeur du produit
 *         category:
 *           type: string
 *           description: L'id de la catégorie du produit
 *         images:
 *           type: array
 *           items:
 *               type: string
 *           description: Les images du produit
 *         estBio:
 *           type: boolean
 *           description: Booléen indiquant si le produit est bio
 *         statut:
 *           type: string
 *           description: chaine indiquant l'état du produit (vendu, en solde etc)
 *         dateModification:
 *            type: string
 *            format: date-time
 *            description: La date de modification du produit
 *         dateSuppression:
 *            type: string
 *            format: date-time
 *            description: La date du suppréssion du produit
 *
 */

/**
 * @swagger
 * tags:
 *   name: Produit
 *   description: Routes de l'API pour la gestion des produits
 */

/**
 * @swagger
 * /api/produits/:
 *   get:
 *     summary: Retourne une liste de tout les produits
 *     tags: [Produit]
 *     responses:
 *       200:
 *         description: La liste de tout les produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produit'
 *       400:
 *         description: Une erreur s'est produite
 */
router.get('/', produitCtrl.getAllProduit);

/**
 * @swagger
 * /api/produits/:
 *   post:
 *     summary: Creer un produit
 *     tags: [Produit]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produit'
 *     responses:
 *       201:
 *         description: Le produit a été crée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produit'
 *       400:
 *         description: Une erreur s'est produite
 */
router.post('/', produitCtrl.createProduit);

router.put('/images/:id', imageMiddleware, produitCtrl.addImagesProduit);

/**
 * @swagger
 * /api/produits/{id}:
 *   get:
 *     summary: Retrouver un produit par son Id
 *     tags: [Produit]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: l'id du produit
 *     responses:
 *       200:
 *         description: Le produit a été récuppéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/produit'
 *       400:
 *         description: Une erreur s'est produite
 */
router.get('/:id', produitCtrl.getOneProduit);

/**
 * @swagger
 * /api/produit/{id}:
 *  put:
 *    summary: Mettre à jour le produit par son Id
 *    tags: [Produit]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: L'id du produit
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Produit'
 *    responses:
 *      200:
 *        description: Le produit a été modifié  avec succès
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Produit'
 *      400:
 *        description: Une erreur s'est produite
 */

router.put('/:id', imageMiddleware, produitCtrl.updateOneProduit);

/**
 * @swagger
 * /api/produits/{id}:
 *   delete:
 *     summary: Supprimer un produit par son Id
 *     tags: [Produit]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id du Produit
 *
 *     responses:
 *       200:
 *         description: Le produit a été supprimé avec succès
 *       400:
 *         description: Une erreur s'est produite
 */
router.delete('/:id', produitCtrl.deleteOneProduit);

module.exports = router;
