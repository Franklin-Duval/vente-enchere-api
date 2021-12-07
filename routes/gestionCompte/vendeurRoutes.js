const express = require('express');
const router = express.Router();

const vendeurCtrl = require('../../controllers/gestionvendeur/vendeurController');

/**
 * @swagger
 * components:
 *   schemas:
 *     vendeur:
 *       type: object
 *       required:
 *         - numeroCNI
 *         - specialite
 *         - user
 *       properties:
 *         accreditation:
 *           type: boolean
 *           description: renseigne si le vendeur est accredite ou non
 *         numeroCNI:
 *           type: string
 *           description: Le numero de CNI du vendeur
 *         specialite:
 *           type: string
 *           description: renseigne si le vendeur est specialiste ou non
 *         chiffreAffaire:
 *           type: Number
 *           description: Le chiffre d'affaire du vendeur
 *         nombreLotsVendu:
 *           type: Number
 *           description: Le nombre de lots vendus par le vendeur
 *         user:
 *           type: string
 *           description: L'utilisateur auquel correspond le vendeur
 *         gerant:
 *           type: string
 *           description: Id du gerant du vendeur
 *
 */

/**
 * @swagger
 * tags:
 *   name: vendeur
 *   description: Routes de l'API pour la gestion des vendeurs
 */
/**
 * @swagger
 * /api/vendeurs/:
 *   get:
 *     summary: Retourne une liste de tout les vendeurs
 *     tags: [Vendeur]
 *     responses:
 *       200:
 *         description: La liste de tout les vendeurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vendeur'
 *       400:
 *         description: Une erreur s'est produite
 */
router.get('/', vendeurCtrl.getAllVendeur);
/**
 * @swagger
 * /api/produits/:
 *   post:
 *     summary: Creer un vendeur
 *     tags: [Vendeur]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vendeur'
 *     responses:
 *       201:
 *         description: Le vendeur a été crée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendeur'
 *       400:
 *         description: Une erreur s'est produite
 */
router.post('/', vendeurCtrl.createVendeur);
/**
 * @swagger
 * /api/vendeurs/{id}:
 *   get:
 *     summary: Retrouver un vendeur par son Id
 *     tags: [Vendeur]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: l'id du vendeur
 *     responses:
 *       200:
 *         description: Le vendeur a été récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendeur'
 *       400:
 *         description: Une erreur s'est produite
 */
router.get('/:id', vendeurCtrl.getOneVendeur);
/**
 * @swagger
 * /api/vendeur/{id}:
 *  put:
 *    summary: Mettre à jour le vendeur par son Id
 *    tags: [Vendeur]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: L'id du vendeur
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Vendeur'
 *    responses:
 *      200:
 *        description: Le vendeur a été modifié  avec succès
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Vendeur'
 *      400:
 *        description: Une erreur s'est produite
 */
router.put('/:id', vendeurCtrl.updateOneVendeur);
/**
 * @swagger
 * /api/vendeurs/{id}:
 *   delete:
 *     summary: Supprimer un vendeur par son Id
 *     tags: [Vendeur]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id du vendeur
 *
 *     responses:
 *       200:
 *         description: Le vendeur a été supprimé avec succès
 *       400:
 *         description: Une erreur s'est produite
 */
router.delete('/:id', vendeurCtrl.deleteOneVendeur);

module.exports = router;
