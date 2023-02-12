const express = require('express')
const router = express.Router()
const { getFiles, uploadFile, deleteFile, updateFile, downloadFile } = require('../handlers/files')
const { isAuth, isAdmin } = require('../middlewares/auth')

// router.use(isAuth)
router.route('/').get(getFiles).post(uploadFile).delete(deleteFile).put(updateFile)
router.route('/:name').get(downloadFile)

module.exports = router
