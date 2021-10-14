const express = require('express');
const router = express.Router();

const {startCreatefiles, getTemplateElements} = require('../controllers/uploadServiceController');
const {handleGetFiles, createAndUploadFiles} = require('../controllers/dowloadServiceController');

router.post('/file/:id', getTemplateElements);
router.post('/getFile/:id', createAndUploadFiles);

module.exports={
    routes: router
}