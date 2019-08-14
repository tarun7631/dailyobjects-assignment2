var express = require('express');
var router = express.Router();
const dataSourse = require('../data.js') ;

/* GET home page. */
router.get('/decode_hero_name', function(req, res, next) {

	if(!req.query.code) return res.status(400).send({msg : "enter code"})

	var code = req.query.code ;
	
	if(code.split(' ').length < 2) return res.status(400).send({msg : "invalid code"})

	code = code.split(' ')[1] ;

	var currentSuperHeroList = [] ;
	
	dataSourse.herosList.forEach(function(hero){
		if(hero.length == code.length) currentSuperHeroList.push(hero)
	})

	var numberMapWithAlphabet = dataSourse.numberMapWithAlphabet ;

	for(let i = 0 ; i < code.length ; i++){
		var alphabets =  numberMapWithAlphabet[code[i]] ;
		var newSuperHerosList = [] ;
		currentSuperHeroList.forEach(function(hero){
			if(alphabets.indexOf(hero[i]) >= 0) newSuperHerosList.push(hero)
		})

		currentSuperHeroList = newSuperHerosList ;
	}

	if(newSuperHerosList.length == 0) return res.status(404).send({msg : "superhero not found"})

	return res.status(200).send({data : newSuperHerosList}) ;
});

module.exports = router;
