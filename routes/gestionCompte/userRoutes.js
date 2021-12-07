const express = require('express');
const router = express.Router();

const userCtrl = require('../../controllers/gestionCompte/userController');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - nom
 *         - prenom
 *         - localisation
 *         - adresse
 *         - pays
 *         - ville
 *         - telephone
 *         - email
 *         - roles
 *         - compte
 *       properties:
 *         nom:
 *           type: string
 *           description: Le nom de l'utilisateur
 *         prenom:
 *           type: string
 *           description: Le prenom de l'utilisateur
 *         telephone:
 *           type: string
 *           description: Le numero de telephone de l'utilisateur
 *         email:
 *           type: string
 *           description: email de l'utilisateur
 *         localisation:
 *           type: object
 *           items:
 *               adresse:
 *                 type: string
 *                 description: adresse de l'utilisateur
 *               pays:
 *                 type: string
 *                 description: pays de l'utilisateur
 *               ville:
 *                 type: string
 *                 description: ville de l'utilisateur
 *           description: Localisation de l'utilisateur (son adresse, sa ville, son pays)
 *         pseudo:
 *           type: string
 *           description: Le pseudonyme de l'utilisateur
 *         roles:
 *           type: Array
 *           items:
 *               type: string
 *           description: Array des roles associés à l'utilisateur
 *         numeroCompte:
 *            type: string
 *            description: Le numero de compte de l'utilisateur
 *         numeroMomo:
 *            type: string
 *            description: Le numero mobile money de l'utilisateur
 *          compte:
 *            type: Schema.Types.ObjectId
 *            items: 
 *                type: string
 *                description: Collection contenant les comptes de l'utilisateur
 *          dateAjout:
 *            type: string
 *            format: date-time
 *            description: La date d'ajout de l'utilisateur
 *
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Routes de l'API pour la gestion des utilisateurs
 */

/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Retourne une liste de tout les utilisateurs
 *     tags: [User]
 *     responses:
 *       200:
 *         description: La liste de tout les utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Une erreur s'est produite
 */
router.get('/', userCtrl.getAllUser);
/**
 * @swagger
 * /api/users/:
 *   post:
 *     summary: Creer un utilisateur
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: L'utilisateur a été crée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Une erreur s'est produite
 */
router.post('/', userCtrl.createUser);
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retrouver un utilisateur par son Id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: l'id de l'utilisateur
 *     responses:
 *       200:
 *         description: L'utilisateur a été récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       400:
 *         description: Une erreur s'est produite
 */
router.get('/:id', userCtrl.getOneUser);
/**
 * @swagger
 * /api/user/{id}:
 *  put:
 *    summary: Mettre à jour l'utilisateur par son Id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: L'id de l'utilisateur
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: L'utilisateur a été modifié  avec succès
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Une erreur s'est produite
 */
router.put('/:id', userCtrl.updateOneUser);
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur par son Id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id de l'utilisateur
 *
 *     responses:
 *       200:
 *         description: L'utilisateur a été supprimé avec succès
 *       400:
 *         description: Une erreur s'est produite
 */
router.delete('/:id', userCtrl.deleteOneUser);

module.exports = router;
