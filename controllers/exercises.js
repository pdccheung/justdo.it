const { json, response } = require('express');
let fetch = require('node-fetch');
const { deserializeUser } = require('passport');
let Member = require('../models/member');
let Workout = require('../models/workout');

module.exports = {
    index,
    show,
    // showMyWorkOut,
    // updateWorkOut,
    // deleteWorkOut,
    // createNew,
}
const api_url = "https://wger.de/api/v2/";
const appendStr = "exercise/?language=2&limit=227&offset=0";
const imgStr = "exerciseimage/?format=json&is_main=True&limit=100&offset=0";



async function index(req, res){ 
    let response = 
    await fetch(api_url + "exercise/?language=2&limit=227&offset=0");
    let results = (await response.json()).results;
    console.log(results.length);

    let response2 = 
    await fetch(api_url + "exerciseimage/?format=json&is_main=True&limit=100&offset=0")
    let results2 = (await response2.json()).results;
    console.log(results2.length);

    for (let a of results2) {
        for (let b of results) {
            if (b.id == a.exercise) {
                b.image = a.image;
            }
        }
    }
    res.render('exercises/index', {
        results: results,
        //req.user from passport
        user: req.user,
    }
    )
}


async function show(req, res){ 
    console.log(req.params.id);
    let response = await fetch(api_url + "exercise/?language=2&limit=227&offset=0");
    let results = (await response.json()).results;
    
    let response2 = 
    await fetch(api_url + "exerciseimage/?format=json&is_main=True&limit=100&offset=0")
    let results2 = (await response2.json()).results;
    console.log(results2.length);

    for (let a of results2) {
        for (let b of results) {
            if (b.id == a.exercise) {
                b.image = a.image;
            }
        }
    }

    let exercise;
    for (let res of results){
        if (res.id == req.params.id){
            exercise = res;
        }
    }

    res.render('exercises/show', {
        exercise: exercise,
        user: req.user,

    });
}


/* 
function addFact(req, res, next) {
    req.user.facts.push(req.body);
    req.user.save(function(err) {
      res.redirect('/students');
    });
  } */




// async function showMyWorkOut (req, res){
//     let response = 
//     await fetch(api_url + appendStr);
//     let results = (await response.json()).results;
//     let response2 = 
//     await fetch(api_url + imgStr)
//     let results2 = (await response2.json()).results;
//     for (let a of results2) {
//         for (let b of results) {
//             if (b.id == a.exercise) {
//                 b.image = a.image;
//             }
//         }
//     }
//     res.render('exercises/workout', {
//         results: results,
//         user: req.user,
//     }
//     );
// }

//  async function updateWorkOut (req, res) {
//     let response = 
//     await fetch(api_url + appendStr);
//     let results = (await response.json()).results;

//     let response2 = 
//     await fetch(api_url + imgStr)
//     let results2 = (await response2.json()).results;


//     for (let a of results2) {
//         for (let b of results) {
//             if (b.id == a.exercise) {
//                 b.image = a.image;
//             }
//         }
//     }
//     console.log("the value is: ", req.body)
//     res.render('exercises/workout', {
//         results: results,
//         body: req.body,
//         user: req.user,
//     } )
//   }

//   function deleteWorkOut (req, res){
//       res.send('deleted')
//   }

//  async function createNew(req, res){
//     console.log(req.body)
//     console.log(req.user)
//     try {
//     await Workout.create(
//         {
//             planName: req.body.planName,
//             member: req.user.id,
//             exercises: req.body.exercises,
//         }
//     )} catch(err){
//         res.send(err);
//     }
//     res.send('thanks')
//     // await Workout.create(req.body)
//     // res.redirect('./myworkout')
// }