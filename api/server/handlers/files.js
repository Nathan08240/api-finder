const fs = require("fs");
const { getMulterStorage } = require("../utils/upload");
const multer = require("multer");

const getFiles = (req, res) => {
  const { path } = req.query;
  const files = [];
  try {
    fs.readdirSync("." + path, { withFileTypes: true }).forEach(function (
      file,
      index
    ) {
      if (file.isFile()) {
        const filePath = "." + path + "/" + file.name;
        const stats = fs.statSync(filePath);
        files.push({
          name: file.name,
          type: "file",
          id: index,
          path: path + "/" + file.name,
          size: stats.size / 1024,
          extension: file.name.split(".").pop(),
          modifiedAt: stats.mtime,
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      message: "Something wrong happened" + err,
    });
  }
  res.send({ files: files });
};

const uploadFile = (req, res) => {
  const target = `${req.query.target}`;
  let storage = getMulterStorage(`${target}`);
  const upload = multer({ storage: storage }).array("file");
  upload(req, res, (err) => {
    if (err) {
      if (!fs.existsSync(`.${target}`)) {
        res.status(400).send({
          message: "Directory doesn't exist",
        });
      } else {
        res.status(500).send({
          message: "Something wrong happened " + err,
        });
      }
    }
    res.status(201).send(req.file);
  });
};

const downloadFile = (req, res) => {
  const target = `.${req.query.target}`;
  const fileName = req.query.target.split("/").pop();
  console.log(target);
  try {
    if (!fs.existsSync(target)) {
      return res.status(400).send({
        message: "File doesn't exist",
      });
    } else {
      res.download(target, fileName, (err) => {
        if (err) console.log(err);
        else {
          res.status(201).end()
        }
      });
    }
    
  } catch (err) {
    res.status(500).send({
      message: "Something wrong happened " + err,
    });
  }
};

const deleteFile = (req, res) => {
  const target = `.${req.query.target}`;
  try {
    if (!fs.existsSync(target)) {
      return res.status(400).send({
        message: "File doesn't exist",
      });
    } else {
      fs.unlink(target, (err) => {
        if (err) console.log(err);
      });
    }
    res.status(201).send({
      message: "File deleted",
    });
  } catch (err) {
    res.status(500).send({
      message: "Something wrong happened " + err,
    });
  }
};

const updateFile = (req, res) => {
  const { target, newName } = req.body;
  const location = target.substring(0, target.lastIndexOf("/"));
  try {
    fs.renameSync(`.${target}`, `.${location}/${newName}`);
    res.send({
      message: "File renamed",
    });
  } catch (err) {
    res.status(500).send({
      message: "Something wrong happened " + err,
    });
  }
};

module.exports = {
  getFiles,
  uploadFile,
  deleteFile,
  updateFile,
  downloadFile,
};
