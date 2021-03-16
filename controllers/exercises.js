let fetch = require('node-fetch');
const { deserializeUser } = require('passport');

module.exports = {
    index,
    show
}


const api_url = "https://wger.de/api/v2/";

async function index(req, res){ 
    let response = await fetch(api_url);
    // let data = await response.json();
    console.log(response);
    // const {name, description} = data;
    // for (let e in data) {
    //     // const {name, description}  = e;
    //     console.log(e.name);
    //     console.log(e.description);
    // }
    res.render('exercises/index', {
        data: response,
        //req.user from passport
        user: req.user,
    }
    )
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