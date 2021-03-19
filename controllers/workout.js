const { json, response } = require("express");
let fetch = require("node-fetch");
const { deserializeUser } = require("passport");
let Member = require("../models/member");
let Workout = require("../models/workout");

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
  let response = await fetch(api_url + appendStr);
  let results = (await response.json()).results;
  let response2 = await fetch(api_url + imgStr);
  let results2 = (await response2.json()).results;
  for (let a of results2) {
    for (let b of results) {
      if (b.id == a.exercise) {
        b.image = a.image;
      }
    }
  }
  res.render("exercises/workout", {
    results: results,
    user: req.user,
  });
}

async function updateWorkOut(req, res) {
  let response = await fetch(api_url + appendStr);
  let results = (await response.json()).results;

  let response2 = await fetch(api_url + imgStr);
  let results2 = (await response2.json()).results;

  for (let a of results2) {
    for (let b of results) {
      if (b.id == a.exercise) {
        b.image = a.image;
      }
    }
  }
  console.log("the value is: ", req.body);
  res.render("exercises/workout", {
    results: results,
    body: req.body,
    user: req.user,
  });
}

function deleteWorkOut(req, res) {
  res.send("deleted");
}

async function createNew(req, res) {
  console.log(req.body);
  console.log(req.user); 
  
  if (req.user) {
      try{ 
        let workout = await new Workout({
        planName: req.body.planName,
        member: req.user.id,
        exercises: req.body.exercises,})
    workout.save(function(err) {
        if (err) return res.redirect('/exercises/workout');
        res.redirect('/exercises')
    })
   } catch(err){
       res.send (err + "please sign in to create plan")
   }
};}
   