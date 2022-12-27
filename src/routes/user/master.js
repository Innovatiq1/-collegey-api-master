// eslint-disable-next-line node/no-unsupported-features/es-syntax
import masterController from '../../controllers/master';

const router = require('express').Router();

router.get('/country', masterController.getCountries);
router.get('/timezone', masterController.getTimezones);
router.get('/state/:country_id', masterController.getStateByCountry);
router.get('/states', masterController.getAllStates);
router.get('/city/:state_id', masterController.getCityByState);
router.get('/cities/:state_id', masterController.getCities);

router.get('/add-data', masterController.addMasterData);
router.get('/get-static-data-list', masterController.getStaticList);

module.exports = router;
