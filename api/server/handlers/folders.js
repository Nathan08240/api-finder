const fs = require("fs");

const getFolders = (req, res) => {
  const { path } = req.query;
  console.log("List of folders");
  const folders = [];
  fs.readdirSync("." + path, { withFileTypes: true }).forEach(function (
    folder,
    index
  ) {
    if (folder.isDirectory()) {
      const folderPath = "." + path + "/" + folder.name;
      const stats = fs.statSync(folderPath);
      console.log(path)
      folders.push({
        id: index,
        path: `${path}/${folder.name}`,
        name: folder.name,
        type: "directory",
        size: folder.size,
        modifiedAt: stats.mtime,
      });
    }
  });
  res.send({ directories: folders });
};

const createFolder = (req, res) => {
  const { location, name } = req.body;
  console.log("Create folder", name, "in", location);
  fs.mkdirSync("." + location + "/" + name, { recursive: true });
  res.status(201).send("Folder created");
};

const deleteFolder = (req, res) => {
  const target = req.query.target;
  fs.rmdirSync(`.${target}`, { recursive: true });
  res.send({
    message: "Folder deleted",
  });
};

const updateFolder = (req, res) => {
  const { oldPath, newPath } = req.body;
  try {
    fs.renameSync(`.${oldPath}`, `.${newPath}`);
    res.send({
      message: "Folder renamed",
    });
  } catch (err) {
    res.status(500).send({
      message: "Something wrong happened",
    });
  }
};

module.exports = {
  getFolders,
  createFolder,
  deleteFolder,
  updateFolder,
};
