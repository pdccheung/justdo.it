const { json, response } = require('express');
let fetch = require('node-fetch');
const { deserializeUser } = require('passport');
let Member = require('../models/member');
let Workout = require('../models/workout');
let Exercise = require('../models/exercise');

module.exports = {
    index,
    show,
    updateExercises,
}

const api_url = "https://wger.de/api/v2/";
const appendStr = "exercise/?language=2&limit=227&offset=0";
const imgStr = "exerciseimage/?format=json&is_main=True&limit=100&offset=0";

async function index(req, res){
    let exercises = await Exercise.find();
    let workout = Workout.find().populate('member').exec(function (err, workout){
        if (err) res.redirect('/exercises');
        return workout;
    })
    console.log(workout)
    res.render("exercises/index", {
        results: exercises,
        user: req.user,
        workout: workout,
    })
}

async function show(req, res){
    console.log(req.params.id);
    let exercise = await Exercise.findOne({ refId : req.params.id});
    console.log(exercise)
    res.render("exercises/show", {
        exercise: exercise,
        user: req.user,
    }
    )

}


async function updateExercises(req, res){
    let response = await fetch(api_url + appendStr);
    let results = (await response.json()).results;
    
    let response2 = 
    await fetch(api_url + imgStr)
    let results2 = (await response2.json()).results;

    for (let img of results2) {
        for (let ex of results) {
            if (ex.id == img.exercise) {
                ex.image = img.image
            } 
            
        }
    } 

    for (let ex of results){
        let el = await Exercise.findOne({refId : ex.id})
        if(!el){
            try{ 
                await Exercise.create({
                    refId: ex.id,
                    category: ex.category, 
                    description: ex.description, 
                    name: ex.name, 
                    muscles: ex.muscles, 
                    equipment: ex.equipment, 
                    image: ex.image,
                }) 
            } catch(err){err => console.log(err); return;};
        }
    }
res.redirect("/exercises")
} 