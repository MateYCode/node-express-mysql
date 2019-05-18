const mysql = require('mysql');
const pool = mysql.createPool(
	{
		connectionLimit : 10,
		host: 'localhost',
		user: '',
		password: '',
		database: ''
	}
);
const getConnection = function (cb) {
	pool.getConnection((err ,connection)=> {
		cb(err, connection);
	});
};
module.exports = {getConnection}; 