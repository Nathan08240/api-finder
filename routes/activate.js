const express = require('express');
const {activeAccount} = require("../handlers/activate");
const router = express.Router();

router.route('/:token')
    .get(activeAccount)

module.exports = router;