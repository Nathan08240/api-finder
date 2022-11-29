const fs = require('fs');

const getFolders = (req, res) => {
    const {path} = req.body
    console.log("List of folders")
    const folders = []
    fs.readdirSync("." + path, {withFileTypes: true}).forEach(folder => {
        if (folder.isDirectory()) {
            folders.push(`${path}/${folder.name}`)
        }
    });
    res.send(folders);
}

const createFolder = (req, res) => {
    const {location, name} = req.body
    fs.mkdirSync("." + location + '/' + name, {recursive: true});
    res.status(201).send('Folder created');
}

const deleteFolder = (req, res) => {
    const target = req.query.target;
    fs.rmdirSync(`.${target}`, {recursive: true})
    res.send({
        "message": "Folder deleted"
    })
}

const updateFolder = (req, res) => {
    const {oldPath, newPath} = req.body;
    try {
        fs.renameSync(`.${oldPath}`, `.${newPath}`);
        res.send({
            "message": "Folder renamed"
        })
    } catch (err) {
        res.status(500).send({
            "message": "Something wrong happened"
        })
    }
}

module.exports = {
    getFolders,
    createFolder,
    deleteFolder,
    updateFolder
}