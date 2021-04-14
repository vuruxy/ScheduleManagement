const mysql = require('mysql');
const config = require('../config.json');

const pool = mysql.createPool({
	connectionLimit: config.databaseInfo.connectionLimit,
	host: config.databaseInfo.host,
	port: config.databaseInfo.port,
	user: config.databaseInfo.user,
	password: config.databaseInfo.password,
	database: config.databaseInfo.database
});

module.exports = {
	executeSql: (sql, params) => {
		return new Promise((resolve, reject) => {
			pool.getConnection((error, connection) => {
				if (error) {
					throw error;
				};
				connection.query(sql, params, (error, results) => {
					if (error) {
						throw error;
					} else {
						resolve(results);
						connection.destroy();
					}
				});
			});
		});
	}
}