const {createToken} = require("../utils/jwt");
const Users = require('../models/user');
const bcrypt = require('bcrypt')


const login = async (req, res) => {
    async function validatePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword)
    }

    try {
        const {email, password} = req.body;

        const user = await Users.findOne({email})
        if (!user) throw new Error('Email does not exist')
        console.log(user)

        const match = await validatePassword(password, user.password)
        if (!match) throw new Error('Password does not match')

        const payload = {userId: user._id}
        const token = createToken(payload, 60 * 60 * 24)

        await Users.findByIdAndUpdate(user._id, {token})
        res.status(200).send({
            data: {email: user.email, role: user.role},
            token,
        })
        console.log("Login successful");

    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

module.exports = {
    login
}