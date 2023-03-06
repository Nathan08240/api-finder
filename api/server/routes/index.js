const usersRouter = require("./users");
const promotionsRouter = require("./promotions");
const filesRouter = require("./files");
const foldersRouter = require("./folders");
const authRouter = require("./auth");
const activateRouter = require("./activate");
const express = require("express");
const apiRouter = express.Router();

const initRouter = (app) => {
  app.use("/api", apiRouter);
  apiRouter.use(express.json());
  apiRouter.use("/users", usersRouter);
  apiRouter.use("/promotions", promotionsRouter);
  apiRouter.use("/files", filesRouter);
  apiRouter.use("/folders", foldersRouter);
  apiRouter.use("/auth", authRouter);
  authRouter.use("/activate", activateRouter);
};

module.exports = initRouter;
