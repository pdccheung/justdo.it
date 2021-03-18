var express = require('express');
var router = express.Router();



let exercisesCtrl = require('../controllers/exercises')

router.get('/', exercisesCtrl.index)



router.get('/myworkout', exercisesCtrl.showMyWorkOut);

router.post('/myworkout', exercisesCtrl.updateWorkOut);
router.post('/newworkout', exercisesCtrl.createNew );

router.delete('/myworkout', exercisesCtrl.deleteWorkOut)
router.get('/:id', exercisesCtrl.show)

/* 
// Insert this middleware for routes that require a logged in user
router.post('/facts', isLoggedIn, studentsCtrl.addFact);
 */

/*  to check if member is logged in
function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
} */


module.exports = router;
