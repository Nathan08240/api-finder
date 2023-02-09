const express = require('express')
const router = express.Router()
const { isAuth, isAdmin } = require('../middlewares/auth')

const { getFiles, uploadFile, deleteFile, updateFile } = require('../handlers/files')
router.use(isAuth)
router.route('/').get(getFiles).post(uploadFile).delete(deleteFile).put(updateFile)

module.exports = router
