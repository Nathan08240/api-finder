const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserByID,
  deleteUserByID,
  UpdateUserByID,
} = require("../handlers/users");
const { isAuth, isAdmin } = require("../middlewares/auth");

// router.use(isAuth);
router.route("/").get(getUsers).post(createUser);

router
  .route("/:id")
  .get(getUserByID)
  .delete(deleteUserByID)
  .put(UpdateUserByID);

module.exports = router;
