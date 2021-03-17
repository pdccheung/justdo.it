const { json } = require('express');
let fetch = require('node-fetch');
const { deserializeUser } = require('passport');
let Member = require('../models/member');

module.exports = {
    index,
    show,
    showMyWorkOut,
}


// fetch overall diagrams; 





const api_url = "https://wger.de/api/v2/";
const jsonFormat = "?format=json";

async function index(req, res){ 
    let response = await fetch(api_url + "exerciseimage/?format=json&is_main=True&limit=100&offset=0");
    let body = await response.json();
    let results = body.results;

    let response2 = await fetch(api_url + "exercise/?language=2");
    let results2 = (await response2.json()).results;
    let count = 0;
    let exResults = []; 
    for (let image of results) {
        for (let exercise of results2) {
            if (exercise.id == image.id ){
                count ++;
                exResults.push(exercise);
            } 
        }

    } 
    console.log("count is now", count);
    console.log(exResults);

    // console.log(results);
    // for (let obj of results){
    //     console.log(obj.image);
    // }
    res.render('exercises/index', {
        results: results,
        //req.user from passport
        user: req.user,
    }
    )
}






function showMyWorkOut (req, res){
    res.render('exercises/workout', {

    });
}







function show(req, res){ 
    res.render('exercises/show', {
    });
}


/* 
function addFact(req, res, next) {
    req.user.facts.push(req.body);
    req.user.save(function(err) {
      res.redirect('/students');
    });
  } */