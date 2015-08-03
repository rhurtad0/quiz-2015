var path = require('path');

//Postgres DATABASE_URL = postgres://whzoylnuiipxaf:QFI72gq0IN6e5nStl
//SQlite DATABASE_URL = sqlite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

//carga el modelo ORM
var Sequelize = require('sequelize');

//usar BBDD SQLITE
var sequelize = new Sequelize(DB_name, user, pwd,
	{
		dialect:  protocol,
		protocol: protocol,
		port: 	  port,
		host: 	  host,
		storage:  storage,
		omitNull: true
	}
);

//importa la defificion de la tabla Quiz en quiz.js

var Quiz = sequelize.import(path.join(__dirname,"quiz"));

//exporta la defificion de la tabla Quiz

exports.Quiz = Quiz;

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then( function() {
	Quiz.count().then( function(count){
		if(count === 0){
			Quiz.create({ pregunta: 'Capital de Italia',
						  respuesta: 'Roma'
			});
			Quiz.create({ pregunta: 'Capital de portugal',
						  respuesta: 'Lisboa'
			})
		.then( function(){ console.log("base de datos inicializada")});
		};
	});
});