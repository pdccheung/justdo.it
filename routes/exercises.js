var express = require('express');
var router = express.Router();



let exercisesCtrl = require('../controllers/exercises')

router.get('/', exercisesCtrl.index)

router.get('/exercise', exercisesCtrl.show)

router.get('/myworkout', exercisesCtrl.showMyWorkOut);


router.post('/myworkout', function(req, res){
  res.send('thanks for posting')
})

router.delete('/myworkout', function(req, res){
  res.send('deleted');
})
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
