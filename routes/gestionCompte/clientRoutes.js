const express = require('express');
const router = express.Router();

const clientCtrl = require('../../controllers/gestionCompte/clientController');

const logMiddleware = require('../../controllers/gestionLog/logController');
router.use((req, res, next) => {
  req.table = 'CLIENTS';
  next();
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - nom
 *         - prenom
 *         - localisation
 *         - email
 *         - telephone
 *         - password
 *         - numeroMomo
 *       properties:
 *         nom:
 *           type: string
 *           description: Le nom du client
 *         prenom:
 *           type: string
 *           description: Le prénom du client
 *         localisation:
 *           type: object
 *           required:
 *             -adresse
 *             -pays
 *             -ville
 *           properties:
 *             adresse:
 *                type: string
 *                description: L'adresse du client
 *             pays:
 *                type: string
 *                description: Le pays où vit le client
 *             ville:
 *                type: string
 *                description: La ville où vit le client
 *           description: La localisation du client
 *         email:
 *           type: string
 *           description: L'adresse mail du client
 *         telephone:
 *           type: string
 *           description: Le numéro de téléphone du client
 *         pseudo:
 *           type: string
 *           description: Le pseudo du client
 *         password:
 *            type: string
 *            description: Le Mot de passe du client
 *         numeroCompte:
 *            type: string
 *            description: Le numéro de compte du client
 *         numeroMomo:
 *            type: string
 *            description: Numéro de téléphone MoMo
 *         nombreProduitsAchetes:
 *            type: number
 *            description: Le nombre de produits achetés par le client
 *         totalArgentDepense:
 *            type: number
 *            description: Argent total depensé
 */

/**
 * @swagger
 * tags:
 *   name: Client
 *   description: Routes de l'API pour la gestion des clients
 */

/**
 * @swagger
 * /api/clients/:
 *   get:
 *     summary: Retourne une liste de tout les clients
 *     tags: [Client]
 *     responses:
 *       200:
 *         description: La liste de tout les clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       400:
 *         description: Une erreur s'est produite
 */
router.get('/', clientCtrl.getAllClient);

/**
 * @swagger
 * /api/clients/:
 *   post:
 *     summary: Creer un client
 *     tags: [Client]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       201:
 *         description: Le client a été crée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Une erreur s'est produite
 */
router.post('/', logMiddleware.createLog, clientCtrl.createClient);

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Retrouver un client par son Id
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: l'id du client
 *     responses:
 *       200:
 *         description: La description du client par son id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/client'
 *       400:
 *         description: Une erreur s'est produite
 */
router.get('/:id', clientCtrl.getOneClient);

/**
 * @swagger
 * /api/client/{id}:
 *  put:
 *    summary: Mettre à jour le client par son Id
 *    tags: [Client]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: L'id du client
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Client'
 *    responses:
 *      200:
 *        description: Le client a été modifié  avec succès
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      400:
 *        description: Une erreur s'est produite
 */
router.put('/:id', logMiddleware.createLog, clientCtrl.updateOneClient);

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Supprimer un client par son Id
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id du Client
 *
 *     responses:
 *       200:
 *         description: Le client a été supprimé avec succès
 *       400:
 *         description: Une erreur s'est produite
 */
router.delete('/:id', logMiddleware.createLog, clientCtrl.deleteOneClient);

module.exports = router;
