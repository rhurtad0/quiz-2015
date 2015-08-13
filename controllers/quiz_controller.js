//importamos el modelo

var models = require('../models/models.js');

//Autoload - factoriza el codigo si la ruta incluye quizId

exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if (quiz){
				req.quiz = quiz;
				next();
			}else{
				next(new Error('No existe quizId= '+ quizId));
			}
		}
	).catch( function(error) { next(error); });
};

// GET QUIZES 
exports.index = function(req, res){
	models.Quiz.findAll().then( 
		function(quizes){
			res.render('quizes/index', { quizes: quizes});
		}	
	).catch(function(error) {next(error);})
};
//quizes question

exports.show = function(req, res){
	res.render('quizes/show', { quiz: req.quiz });
};

//quizes answer

exports.answer = function(req, res){
	var resultado = 'Incorrecto !';
	if( req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado });
};

//quiz new

 exports.new = function(req, res){
 	var quiz = models.Quiz.build( //objeto temporal
		{pregunta : "Pregunta", respuesta : "Respuesta" }
	);

	res.render('quizes/new', {quiz : quiz});
 };

 //quiz create

 exports.create = function(req, res){
 	var quiz = models.Quiz.build(req.body.quiz);

 	//guarda en l BD los campos pregunta y respuesta de quiz
 	quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
 		res.redirect('/quizes');
 	})// redireccion (url relativo) lista de preguntas
 };