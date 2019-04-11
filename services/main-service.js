const Role = require('../helpers/role');
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const sql = require("mssql");
const MongoClient = require('mongodb').MongoClient;
const dbconfig = {
	user: 'user',
	password: 'password',
	server: 'localhost', 
	database: 'DBName' 
};
const mongoUrl = "url";

const auth = async ({email, password}) => {
	let pool = await sql.connect(dbconfig);
	try {
		const request = pool.request();
		request.input('email', sql.NVarChar, email);
		request.input('password', sql.NVarChar, password);
		const result = await request.query`
			if exists(
			select * from [User] where Email = @email and Password = @password
			) select UserId as [Result] from [User] where Email = @email and Password = @password
			else select 0 as [Result]`
		sql.close();
		if (result.recordset[0].Result > 0) {
			const token = jwt.sign({ sub: result.recordset[0].Result, role: Role.User }, config.secret);
			return { success: true, token: token };
		} else
			return { success: false, message: 'Invalid Token' };
	} catch (err) {
		sql.close();
		return { success: false, message: 'Internal Error' };
	}
}

const getProducts = async () => {
	let pool = await sql.connect(dbconfig);
  try {
    const result = await pool.query`select * from Product`
		sql.close();
		return { success: true, products: result.recordset };
  } catch (err) {
		sql.close();
		return { success: false, products: [] };
  }
}

const getFilteredProducts = async (productId) => {
	let pool = await sql.connect(dbconfig);
  try {
    const request = pool.request();
    request.input('productId', sql.Int, productId)
    const result = await request.query`select * from Product where Id = @productId`
    sql.close();
		return { success: true, products: result.recordset };
  } catch (err) {
    sql.close();
		return { success: false, products: [] };
  }
}

//this is made async with Promise
const getLogs = async () => {
	return new Promise((resolve, reject) => {
		MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, mongoclient) => {
			if (err) resolve({ success: false, logs: [] });
			var db = mongoclient.db("MongoDb");
			db.collection("Logs").findOne({}, function(err, result) {
				if (err) resolve({ success: false, logs: [] });
				resolve({ success: true, logs: result });
			});
		});
	})
}

module.exports = {
	auth,
	getProducts,
	getFilteredProducts,
	getLogs
};