const fs = require('fs');
const {getMulterStorage} = require("../utils/upload");
const multer = require("multer");

const getFiles = (req, res) => {
    const {path} = req.query;
    const files = []
    try {
        fs.readdirSync("." + path, {withFileTypes: true}).forEach(function (file, index) {
            if (file.isFile()) {
                const filePath = '.' + path + "/" + file.name;
                const stats = fs.statSync(filePath);
                files.push({
                    name: file.name,
                    type: "file",
                    id: index,
                    path: path + "/" + file.name,
                    size: stats.size / 1024,
                    extension: file.name.split('.').pop(),
                    modifiedAt: stats.mtime
                })
            }
        })
    } catch (err) {
        res.status(500).send({
            "message": "Something wrong happened" + err
        })
    }
    res.send({files: files});
}

const uploadFile = (req, res) => {
    const target = `${req.query.target}`;
    let storage = getMulterStorage(target);
    const upload = multer({storage: storage}).array("file");
    upload(req, res, (err) => {
        if (err) {
            if (!fs.existsSync(`.${target}`)) {
                res.status(400).send({
                    message: "Directory doesn't exist"
                })
            } else {
                res.status(400).send({
                    message: "Something wrong happened"
                })
            }
        }
        res.status(201).send(req.file);
    });
}

const deleteFile = (req, res) => {
    try {
        fs.unlinkSync(`.${req.query.target}`)
        res.status(201).send({
            "message": "File deleted"
        })
    } catch (e) {
        res.json(e)
    }
    res.send()
}

const updateFile = (req, res) => {
    const {target, newName} = req.body;
    const location = target.substring(0, target.lastIndexOf('/'))
    try {
        fs.renameSync(`.${target}`, `.${location}/${newName}`);
        res.send({
            "message": "File renamed"
        })
    } catch (err) {
        res.status(500).send({
            "message": "Something wrong happened"
        })
    }
}

module.exports = {
    getFiles,
    uploadFile,
    deleteFile,
    updateFile
}