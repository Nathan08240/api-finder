const multer = require("multer");
const slugify = require("slugify");

const getMulterStorage = (dir) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `.${dir}`);
    },
    filename: function (req, file, cb) {
      cb(null, `${slugify(file.originalname)}`);
    },
  });
};

module.exports = {
  getMulterStorage,
};
