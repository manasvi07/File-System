
const fileRepo = require('../RepositoryServices/fileRepoService');


class fileservice {

	getDetails(req, res, next) {
		try {
			let tRepo = new fileRepo();
			tRepo.getDestails(req, res, function (err, result) {
				if (err) {
					res.status(400).json({
						status: 'Failure',
						statusCode: 0,
						message: 'Unable to get details.'
					});
				}
				else {
					res.status(201).json({
						status: 'Success',
						statusCode: 1,
						result: result,
						message: 'Details retrieved successfully.'
					});
				}
			});
		}
		catch (e) {
			res.status(400).json({
				status: 'Failure',
				statusCode: 0,
				message: 'Unable to get details.'
			});
		}
	}

	//Adding Files and Folders
	addFilesFoldersService(req, res, next) {
		try {
			let tRepo = new fileRepo();
			tRepo.addFilesFoldersRepo(req, res, function (err, result) {
				if (err) {
					console.log(err)
					res.status(400).json({
						status: 'Failure',
						statusCode: 0,
						message: 'Unable to add details.'
					});
				}
				else {
					res.status(201).json({
						status: 'Success',
						statusCode: 1,
						result: result,
						message: 'Details added successfully.'
					});
				}
			});
		}
		catch (e) {
			res.status(400).json({
				status: 'Failure',
				statusCode: 0,
				message: 'Unable to add deails.'
			});
		}
	}

	//Deleting Files and Folders
	delFilesFoldersService(req, res, next) {
		try {
			let tRepo = new fileRepo();
			tRepo.delFilesFoldersRepo(req, res, function (err, result) {
				if (err) {
					console.log(err)
					res.status(400).json({
						status: 'Failure',
						statusCode: 0,
						message: 'Unable to delete details.'
					});
				}
				else {
					res.status(201).json({
						status: 'Success',
						statusCode: 1,
						result: result,
						message: 'Details Deleted successfully.'
					});
				}
			});
		}
		catch (e) {
			res.status(400).json({
				status: 'Failure',
				statusCode: 0,
				message: 'Unable to delete deails.'
			});
		}
	}

	//API to search the file and folder
	searchFileFolderService(req, res, next) {
		try {
			let tRepo = new fileRepo();
			tRepo.searchFileFolderRepo(req, res, function (err, result) {
				if (err) {
					res.status(400).json({
						status: 'Failure',
						statusCode: 0,
						message: 'Unable to search details.'
					});
				}
				else {
					res.status(201).json({
						status: 'Success',
						statusCode: 1,
						result: result,
						message: 'Details retrieved successfully.'
					});
				}
			});
		}
		catch (e) {
			res.status(400).json({
				status: 'Failure',
				statusCode: 0,
				message: 'Unable to search details.'
			});
		}
	}

	//API to add user email
	addUserDetailsService(req, res, next) {
		try {
			let tRepo = new fileRepo();
			tRepo.addUserDetailsRepo(req, res, function (err, result) {
				if (err) {
					res.status(400).json({
						status: 'Failure',
						statusCode: 0,
						message: 'Unable to add details.'
					});
				}
				else {
					res.status(201).json({
						status: 'Success',
						statusCode: 1,
						result: result,
						message: 'Details added successfully.'
					});
				}
			});
		}
		catch (e) {
			res.status(400).json({
				status: 'Failure',
				statusCode: 0,
				message: 'Unable to add details.'
			});
		}
	}


}

module.exports = fileservice;