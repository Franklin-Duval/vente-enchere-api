const express = require('express');
const router = express.Router();

const ponnectionCtrl = require('../../controllers/gestionEnchere/participationController');

router.get('/', ponnectionCtrl.getAllParticipation);
router.post('/', ponnectionCtrl.createParticipation);
router.get('/:id', ponnectionCtrl.getOneParticipation);
router.put('/:id', ponnectionCtrl.updateOneParticipation);
router.delete('/:id', ponnectionCtrl.deleteOneParticipation);

module.exports = router;
