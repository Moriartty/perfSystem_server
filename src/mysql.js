var mysql = require('mysql');
var db = {};

db.insert = function(connection,sql,params,callback){
	connection.query(sql,params,function(error,results,fields){
		if(error) 
			throw error;
		callback(results.insertId);
	})
}

db.query = function(connection,sql,callback){
	connection.query(sql,function(error,results){
		if(error) 
			throw error;
		callback(results);
	})
}

db.close = function(connection){
	connection.end(function(err){
		if(err)
			return;
		else
			console.log('close connection');
	})
}

db.connection = function(){
	var connection = mysql.createConnection({
		host:'45.77.34.111',
		user:"root",
		password:'123456',
		database:'PerformanceX',
		multipleStatements:true
	});
	connection.connect(function(err){
		if(err){
			throw err;
		}
	});
	return connection;
}

module.exports = db;