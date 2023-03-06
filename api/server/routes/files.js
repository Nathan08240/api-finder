const express = require("express");
const router = express.Router();
const {
  getFiles,
  uploadFile,
  deleteFile,
  updateFile,
  downloadFile,
} = require("../handlers/files");
const { isAuth, isAdmin } = require("../middlewares/auth");

// router.use(isAuth)
router
  .route("/")
  .get(getFiles)
  .delete(deleteFile)
  .post(uploadFile)
  .put(updateFile);
router.route("/download").get(downloadFile);
module.exports = router;
