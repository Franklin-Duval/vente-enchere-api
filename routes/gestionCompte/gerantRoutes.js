const express = require('express');
const router = express.Router();

const gerantCtrl = require('../../controllers/gestionCompte/gerantController');
/**
 * @swagger
 * components:
 *   schemas:
 *     gerant:
 *       type: object
 *       required:
 *         - user
 *       properties:
 *         nombreAccreditation:
 *           type: Number
 *           description: Nombre d'accreditations du gerant
 *         user:
 *           type: string
 *           description: L'utilisateur auquel correspond le gerant
 *
 */
/**
 * @swagger
 * tags:
 *   name: gerant
 *   description: Routes de l'API pour la gestion des gerants
 */

/**
 * @swagger
 * /api/gerant/:
 *   get:
 *     summary: Retourne une liste de tout les gerants
 *     tags: [Gerant]
 *     responses:
 *       200:
 *         description: La liste de tout les gerants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gerant'
 *       400:
 *         description: Une erreur s'est produite
 */
router.get('/', gerantCtrl.getAllGerant);
/**
 * @swagger
 * /api/gerant/:
 *   post:
 *     summary: Creer un gerant
 *     tags: [Gerant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Gerant'
 *     responses:
 *       201:
 *         description: Le gerant a été crée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gerant'
 *       400:
 *         description: Une erreur s'est produite
 */
router.post('/', gerantCtrl.createGerant);
/**
 * @swagger
 * /api/gerant/{id}:
 *   get:
 *     summary: Retrouver un gerant par son Id
 *     tags: [Gerant]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: l'id du gerant
 *     responses:
 *       200:
 *         description: Le gerant a été récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gerant'
 *       400:
 *         description: Une erreur s'est produite
 */
router.get('/:id', gerantCtrl.getOneGerant);
/**
 * @swagger
 * /api/gerant/{id}:
 *  put:
 *    summary: Mettre à jour le gerant par son Id
 *    tags: [Gerant]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: L'id du gerant
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Gerant'
 *    responses:
 *      200:
 *        description: Le gerant a été modifié  avec succès
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Gerant'
 *      400:
 *        description: Une erreur s'est produite
 */
router.put('/:id', gerantCtrl.updateOneGerant);
/**
 * @swagger
 * /api/gerant/{id}:
 *   delete:
 *     summary: Supprimer un gerant par son Id
 *     tags: [Gerant]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id du gerant
 *
 *     responses:
 *       200:
 *         description: Le gerant a été supprimé avec succès
 *       400:
 *         description: Une erreur s'est produite
 */
router.delete('/:id', gerantCtrl.deleteOneGerant);

module.exports = router;
