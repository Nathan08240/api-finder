const {createToken} = require("../utils/jwt");

const login = (req, res) => {
    const {email, password} = req.body;
    if (email !== 'branconathan@gmail.com' || password !== '1234567890') {
        res.status(401).json({message: 'Invalid credentials'});
    }

    const payload = req.body;
    const token = createToken(payload, '1h');
    res.json({token});
}

module.exports = {
    login
}