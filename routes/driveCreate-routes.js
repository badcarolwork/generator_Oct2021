const express = require("express");
const router = express.Router();

const { createNewfolder } = require("../controllers/createFileService");

router.post("/file/:id", createNewfolder);
// router.post("/getFile/:id", createAndUploadFiles);

module.exports = {
  routes: router,
};
