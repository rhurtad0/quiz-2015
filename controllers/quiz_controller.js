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
			res.render('quizes/index', { quizes: quizes, errors : []});
		}	
	).catch(function(error) {next(error);})
};
//quizes question

exports.show = function(req, res){
	res.render('quizes/show', { quiz: req.quiz , errors: []});
};

//quizes answer

exports.answer = function(req, res){
	var resultado = 'Incorrecto !';
	if( req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors:[] });
};

//quiz new

 exports.new = function(req, res){
 	var quiz = models.Quiz.build( //objeto temporal
		{pregunta : "Pregunta", respuesta : "Respuesta" }
	);

	res.render('quizes/new', {quiz : quiz, errors:[]});
 };

 //quiz create

 exports.create = function(req, res){
 	var quiz = models.Quiz.build(req.body.quiz);

 	//validaciones de los campos de tabla
 	var errors = quiz.validate();
 	if(errors){
 		var i=0;
 		var errores = new Array();
 		for (var prop in errors){
 			errores[i++] = {
 				message: errors[prop]
 			};
 		}
 			res.render('quizes/new', {quiz : quiz, errors: errores});
 	}else{
			//guarda en l BD los campos pregunta y respuesta de quiz
		 	quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
		 		res.redirect('/quizes');
		 	})// redireccion (url relativo) lista de preguntas
	}
};

 exports.edit = function(req, res){
 	var quiz = req.quiz;

 	res.render('quizes/edit', { quiz:quiz, errors:[]});
 };

  exports.update = function (req, res){
  	req.quiz.pregunta = req.body.quiz.pregunta;
  	req.quiz.respuesta = req.body.quiz.respuesta;

  	req.quiz.validate().then(function(err){
  		if(err){
  			res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
  		}else{
  			req.quiz.save( {fields: ["pregunta", "respuesta"]}).then(
  				function(){
  					res.redirect('/quizes');
  				}
  				);
  		}
  	}
  	);
  }
 	