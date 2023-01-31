const express = require('express')
const router = express.Router()
const { isAuth, isAdmin } = require('../middlewares/auth')

const {
  getFolders,
  createFolder,
  deleteFolder,
  updateFolder,
} = require('../handlers/folders')

/* GET users listing. */
router.use(isAuth)
router
  .route('/')
  .get(getFolders)
  .post(createFolder)
  .delete(isAdmin, deleteFolder)
  .put(isAdmin, updateFolder)

module.exports = router
