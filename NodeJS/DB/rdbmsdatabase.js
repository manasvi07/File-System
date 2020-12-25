/*************************************************************************************************************************************************************/
/*
Name: Knex
Functionality: This JavaScript file will initiate the Knex and connect to the SQL Database.
*/
/*************************************************************************************************************************************************************/
//Required Modules
var crypto = require("crypto-js");
var appRoot = require('app-root-path');
const key='depwjku#'
//Configuration for Database Connection

var config = {
	client: 'mysql',
	connection: {
		host : decrypt(process.env.HOSTNAME, key),
		user: decrypt(process.env.DBUSER, key),
		password: decrypt(process.env.PASSWORD, key),
		database: decrypt(process.env.DATABASE, key)
	}
}
//Initializing a Knex connection
var knex = require('knex')(config);

//Function to initialize Knex connection if it is not available 
knex.initializeknex = function (knex) {
	if (knex.client.pool == undefined) {
		knex.initialize();
	}
	return;
}
//Function to encrypt the file name with provided key
function decrypt(text, key) {
	try {
		var cipher_text = crypto.AES.decrypt(text, key);
		cipher_text = cipher_text.toString(crypto.enc.Utf8);
		return cipher_text;
	}
	catch (err) {
		console.log("Unable to decrypt: " + err);
	}
}

module.exports = knex;
