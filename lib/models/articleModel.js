const mysqlLib = require('../mysqlLib');
var articleModel = {};

articleModel.getArticle = (id, callback) => {
	mysqlLib.getConnection((err, connection) => {
		if (err) return callback(err);

		const sql = 'SELECT * FROM articles WHERE id = ' + connection.escape(id);
		connection.query(sql, function (error, row) {
			connection.release();
			if (error) {
				throw error;
			}
			callback(null, row);
		});
	});
};

articleModel.insertArticle = (articleData, callback) => {
	mysqlLib.getConnection((err, connection) => {
		if (err) return callback(err);
		connection.query('CREATE TABLE IF NOT EXISTS articles(id int auto_increment primary key, title varchar(150),content varchar(255),date int not null)', function (err) {
			if (err) throw err;
			connection.query('INSERT INTO articles SET ?', articleData, function (error, result) {
				connection.release();
				if (error) {
					throw error;
				}
				else {
					callback(null, { 'insertId': result.insertId });
				}
			});
		});
	});
};

module.exports = articleModel;