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

/* GET users listing. */
// router.use(isAuth);
router
  .route("/")
  // .get(getUsers)
  .get((req, res) => {
    res.json({
      message: "Hello World",
    });
  })
  .post(createUser);

router
  .route("/:id")
  .get(getUserByID)
  .delete(isAdmin, deleteUserByID)
  .put(isAdmin, UpdateUserByID);

module.exports = router;
