let fetch = require('node-fetch');

module.exports = {
    index,
    show
}

async function index(req, res){ 
    let response = await fetch('https://wger.de/api/v2/exercise');
    let body = await response.json();
console.log(body);
    res.render('exercises/index', {
        body: body,
    }
    )
}

function show(req, res){ 
    res.render('exercises/show', {
    });
}

