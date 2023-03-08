const express = require("express");
const router = express.Router();
const { isAuth, isAdmin } = require("../middlewares/auth");

const {
  getFolders,
  createFolder,
  deleteFolder,
  updateFolder,
} = require("../handlers/folders");

// router.use(isAuth)
router
  .route("/")
  .get(getFolders)
  .post(createFolder)
  .delete(deleteFolder)
  .put(updateFolder);

module.exports = router;
