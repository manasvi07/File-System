var knexClient = require('../DB/rdbmsdatabase.js');
var nodemailer = require('nodemailer');
const key='depwjku#'
var crypto = require("crypto-js");

class filereposervice {
	getDestails(req, res, callback) {
		try {
			knexClient.initializeknex(knexClient);
			//select query to get details
			knexClient.from('file_hierarchy').select('file_and_folder','url')
				.then(function (result) {
					console.log(result)
					callback(null, result);
				})
				.catch(function (error) {
					console.log(error)
					//Send error status and response
					callback(error, null);
				});
		}
		catch (err) {
			callback(err, null);
		}
	}

	async addFilesFoldersRepo(req, res, callback) {
		try {
			knexClient.initializeknex(knexClient);
			const file = req.body.file;
			let value, array = [], flag, parent;
			file.map(obj => {
				value = { file_and_folder: obj["name"], parent_name: obj["parent"], url: null }
				array.push(value)
			})
			const Id = await knexClient.insert(array, ['id']).into('file_hierarchy')
			if(Id.length>0){
				const email=await knexClient('user_details').select('email');
				Email(email);
			}
			const a = "/";

			for (var i = 0; i < file.length; i++) {
				if (file[i].parent !== null) {
					parent = file[i].parent
					flag = parent.concat(a, file[i].name)
					const b = await knexClient.from('file_hierarchy').select('parent_name').where({ 'file_and_folder': parent })
					if (b[0].parent_name === null) {
						await knexClient('file_hierarchy').where({ file_and_folder: file[i].name }).update({ url: flag })
					}
					else {
						flag = b[0].parent_name.concat(a, flag)
						parent = b[0].parent_name;
						await knexClient('file_hierarchy').where({ file_and_folder: file[i].name }).update({ url: flag })

					}

				}
			}

			await knexClient.from('file_hierarchy').select('*')
				.then(function (result) {
					callback(null, result);
				})
				.catch(function (error) {
					console.log(error)
					//Send error status and response
					callback(error, null);
				});

		}
		catch (err) {
			callback(err, null);
		}
	}

	async delFilesFoldersRepo(req, res, callback) {
		try {
			
			knexClient.initializeknex(knexClient);
			const file = req.body.file;
			let a,row,unique=[];
			for (var i = 0; i < file.length; i++) {
				const fileInfo=await knexClient.from('file_hierarchy').select('file_and_folder').where({ 'parent_name': file[i] })
				if(fileInfo.length!==0){
					let qry=`select url from file_hierarchy where url like '${file[i]}%' or url like '%${file[i]}%'`
					a=await knexClient.raw(qry);
				
					for(var j=0;j <a[0].length; j++){
						row=a[0][j].url.split('/')
							row.map(obj=>{
								if(!unique.includes(obj)){
									unique.push(obj);
								}
							})
					}
				}
				else{
					unique.push(file[i])
				}
				
			}
			//select query to delete details
			await knexClient('file_hierarchy').whereIn('file_and_folder', unique).del()
				.then(function (result) {
					callback(null, result);
				})
				.catch(function (error) {
					console.log(error)
					//Send error status and response
					callback(error, null);
				});
		}
		catch (err) {
			callback(err, null);
		}
	}

	async searchFileFolderRepo(req, res, callback) {
		try {
			knexClient.initializeknex(knexClient);
			const file = req.query.file;
			//select query to get details
			knexClient.from('file_hierarchy').select('url').where({'file_and_folder':file})
				.then(function (result) {
					if(result[0].url===null)
					{
						res.status(201).json({
							status: 'Success',
							statusCode: 1,
							message: 'Given File/Folder is a parent in hierarchy'
						});
					}
					else{
						callback(null, result);
					}
				})
				.catch(function (error) {
					console.log(error)
					//Send error status and response
					callback(error, null);
				});
		}
		catch (err) {
			callback(err, null);
		}
	}

	async addUserDetailsRepo(req, res, callback) {
		try {
			knexClient.initializeknex(knexClient);
			const name=req.body.name;
			const email=req.body.email;
			const value={name:name,email:email}
			//select query to get details
			await knexClient.into('user_details').insert(value)
				.then(function (result) {
					console.log(result)
					callback(null, result);
				})
				.catch(function (error) {
					console.log(error)
					//Send error status and response
					callback(error, null);
				});
		}
		catch (err) {
			callback(err, null);
		}
	}


}

function Email(email) {
	var transporter = nodemailer.createTransport({                        //specifying details to send mail
	host:"smtp.gmail.com",
	port:587,
	service: 'gmail',
	auth: {
			user: decrypt(process.env.EMAIL, key),
			pass: decrypt(process.env.EP, key)
		  }
});
email.forEach(function (to, i , array) {
	var mailOptions = {
		from: 'mnsvi07@gmail.com',
		to: to["email"],
		subject: 'Notification',
		text: 'A new File/Folder is added!'
				  }
	transporter.sendMail(mailOptions, function(error, info){     //sending Mail
	if (error) {
		console.log(error);
			 } 
	else {
		console.log('Email sent: ' + info.response);
		}
	});
})

//Function to encrypt the file name with provided passphrase/key
function decrypt(text, key) {
	try {
		var cipher_text = crypto.AES.decrypt(text, key);
		cipher_text = cipher_text.toString(crypto.enc.Utf8);
		return cipher_text;
	}
	catch (err) {
		console.log("Unable to decrypt: " + err);
		//In addition, we can log error to a file.
	}
}

  
}


module.exports = filereposervice;