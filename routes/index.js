var express = require("express");
var router = express.Router();
let Member = require("../models/member");
let Workout = require("../models/workout");
let Exercise = require("../models/exercise");

const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "JustDo.It",
    user: req.user,
  });
});

router.get("/contactus", function (req, res) { 
  res.render("contactForm", {
    user: req.user,
  });
});


router.get("/addNewEx", function(req, res) {
  res.render('addExForm', {
    user: req.user,
  })
})

// to be deleted after test
router.post('/addEx', addNewEx)

async function addNewEx(req, res){
  console.log (req.body);
  let newExercise = await new Exercise(req.body);
  newExercise.save(function(err){
    if (err) return res.send("sorry no go");
    res.send("success")
  })
}


// Google OAuth login route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/exercises",
    failureRedirect: "/exercises",
  })
);

// OAuth logout route
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/exercises");
});

module.exports = router;
