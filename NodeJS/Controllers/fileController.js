
var express = require('express');
const router = express.Router();
var fileService = require('../Services/fileService');

let tService = new fileService();

router.get('/getDetails', tService.getDetails);
router.post('/addFilesFolders', tService.addFilesFoldersService);
router.post('/delFilesFolders', tService.delFilesFoldersService);
router.post('/addUserDetails', tService.addUserDetailsService);
router.get('/searchFileFolder', tService.searchFileFolderService);

module.exports = router;

