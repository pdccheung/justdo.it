var express = require('express');
var router = express.Router();
module.exports = router;

let exercisesCtrl = require('../controllers/exercises')

router.get('/', exercisesCtrl.index)

router.get('/exercise', exercisesCtrl.show)
