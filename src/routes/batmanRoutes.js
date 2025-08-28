const express = require('express');
const router = express.Router();

const batmanController = require('../controllers/batmanController');


router.get('/', batmanController.getBatman);
router.post('/', batmanController.createBatman);

router.get('/villains', batmanController.getAllVillains);
router.post('/villains', batmanController.createVillain);
router.get('/villains/:nameVillain', batmanController.getVillainByName);
router.get('/villains/:id', batmanController.updateVillain);
router.put('/villains/:id', batmanController.deleteVillain);

router.get('/gadgets', batmanController.getBatmanGadgets);
router.post('/gadgets', batmanController.getGadgetById);

module.exports = router;