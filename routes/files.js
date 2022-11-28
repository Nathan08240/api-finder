const express = require('express');
const router = express.Router();
const {isAuth, isAdmin} = require("../middlewares/auth");

const {getFiles, uploadFile, deleteFile, updateFile} = require('../handlers/files');
router.use(isAuth);
router.route('/')
    .get(getFiles)
    .post(isAdmin, uploadFile)
    .delete(isAdmin, deleteFile)
    .put(isAdmin, updateFile)

module.exports = router;
