//importamos el modelo

var models = require('../models/models.js');


// GET QUIZES 
exports.index = function(req, res){
	models.Quiz.findAll().then( function(quizes){
		res.render('quizes/index', { quizes: quizes});
	});
};
//quizes question

exports.show = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', { quiz: quiz });
	});
};

//quizes answer

exports.answer = function(req, res){
	models.Quiz.find(req.params.quizId).then( function(quiz){
		if(req.query.respuesta === quiz.respuesta ) {
			res.render('quizes/answer', { quiz:quiz, respuesta: "Correcto !"});
		} else{
			res.render('quizes/answer', { quiz:quiz, respuesta: "Incorrecto !"});
		}
	});
};