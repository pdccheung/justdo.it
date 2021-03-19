const { json, response } = require("express");
let fetch = require("node-fetch");
const { deserializeUser } = require("passport");
let Member = require("../models/member");
let Workout = require("../models/workout");
let Exercise = require('../models/exercise');

module.exports = {
  showMyWorkOut,
  updateWorkOut,
  createNew,
  deleteWorkOut,
};


const api_url = "https://wger.de/api/v2/";
const appendStr = "exercise/?language=2&limit=227&offset=0";
const imgStr = "exerciseimage/?format=json&is_main=True&limit=100&offset=0";


async function showMyWorkOut(req, res) {
  let exercises = await Exercise.find();
  let workout = await Workout.find();

/* 
  await Workout.find()
  .populate('exercises')
  .exec(function(err, wo){
    if (err) return res.send('not found');
    console.log(wo);
  });
  console.log("workout: ", workout);
 */

  res.render("exercises/workout", {
    results: exercises,
    user: req.user,
    workout: workout,
  });
}


async function updateWorkOut(req, res){
  let exercises = await Exercise.find();
    console.log("the value is: ", req.body);
    res.render("exercises/workout", {
    results: results,
    body: req.body,
    user: req.user,
})
}



function deleteWorkOut(req, res) {
  res.send("deleted");
}




async function createNew(req, res) {
  let indworkout = await Workout.find();
  for (let w of indworkout){
    if (w.planName == req.body.planName){
      w.exercises.push(req.body.exercises)
    } else await Workout.create(req.body); } 
  res.redirect('/exercises/myworkout');
}



 
  