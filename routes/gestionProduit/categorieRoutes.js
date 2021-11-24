const express = require('express');
const router = express.Router();

const categorieCtrl = require('../../controllers/gestionProduit/categorieController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Categorie:
 *       type: object
 *       required:
 *         - nom
 *         - description
 *       properties:
 *         nom:
 *           type: string
 *           description: nom de la categorie
 *         description:
 *           type: string
 *           description: description de la categorie
 *         dateModification:
 *           type: string
 *           format: date-time
 *           description: La date de modification de la categorie
 *         dateSuppression:
 *            type: string
 *            format: date-time
 *            description: La date de suppréssion de la categorie
 *
 *
 */

/**
 * @swagger
 * tags:
 *   name: Categorie
 *   description: Routes de l'API pour la gestion des categories
 */

/**
 * @swagger
 * /api/categories/:
 *   get:
 *     summary: Retourne une liste de toute les categories de produit
 *     tags: [Categorie]
 *     responses:
 *       200:
 *         description: La liste de toute les categories de produit
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categorie'
 *       400:
 *         description: Une erreur s'est produite
 */
router.get('/', categorieCtrl.getAllCategorie);

/**
 * @swagger
 * /api/categories/:
 *   post:
 *     summary: Creer une categorie
 *     tags: [Categorie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categorie'
 *     responses:
 *       201:
 *         description: La categorie a été crée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categorie'
 *       400:
 *         description: Une erreur s'est produite
 */
router.post('/', categorieCtrl.createCategorie);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Retrouver une categorie par son Id
 *     tags: [Categorie]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: l'id de la categorie
 *     responses:
 *       200:
 *         description: La categorie a été récuppéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/categorie'
 *       400:
 *         description: Une erreur s'est produite
 */
router.get('/:id', categorieCtrl.getOneCategorie);

/**
 * @swagger
 * /api/categorie/{id}:
 *  put:
 *    summary: Mettre à jour le categorie par son Id
 *    tags: [Categorie]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: L'id de la categorie
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Categorie'
 *    responses:
 *      200:
 *        description: La categorie a été modifié  avec succès
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Categorie'
 *      400:
 *        description: Une erreur s'est produite
 */
router.put('/:id', categorieCtrl.updateOneCategorie);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Supprimer une categorie par son Id
 *     tags: [Categorie]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id de la categorie
 *
 *     responses:
 *       200:
 *         description: La categorie a été supprimé avec succès
 *       400:
 *         description: Une erreur s'est produite
 */
router.delete('/:id', categorieCtrl.deleteOneCategorie);

/*router.get('/', categorieCtrl.getAllCategorie);
router.post('/', categorieCtrl.createCategorie);
router.get('/:id', categorieCtrl.getOneCategorie);
router.put('/:id', categorieCtrl.updateOneCategorie);
router.delete('/:id', categorieCtrl.deleteOneCategorie);*/

module.exports = router;
