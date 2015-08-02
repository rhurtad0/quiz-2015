var path = require('path');

//carga el modelo ORM
var Sequelize = require('sequelize');

//usar BBDD SQLITE
var sequelize = new Sequelize(null, null, null,

					{ dialect: "sqlite", storage: "quiz.sqlite" }

					);

//importa la defificion de la tabla Quiz en quiz.js

var Quiz = sequelize.import(path.join(__dirname,"quiz"));

//exporta la defificion de la tabla Quiz

exports.Quiz = Quiz;

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success( function() {
	Quiz.count().success( function(count){
		if(count === 0){
			Quiz.create({ pregunta: 'Capital de Italia',
						  respuesta: 'Roma'
			})
		.success( function(){ console.log("base de datos inicializada")});
		};
	});
});