const Users = require('../models/user');
const {sendEmail} = require("../utils/mailer");
const CryptoJS = require('crypto-js');
const client = require('../utils/redis');

const createUser = async function (req, res) {
    try {
        const user = new Users(req.body);
        await user.save();
        const token = CryptoJS.AES.encrypt(user.email, process.env.CRYPTOJS_SECRET).toString();
        console.log('token is: ' + token);

        await client.set('token', token, 'EX', 60 * 1);

        client.on('set', function (key, value) {
            console.log('key: ' + key + ' value: ' + value);
        });

        try {
            await sendEmail({
                email: user.email,
                subject: 'Welcome to the app',
                message: `
                    <h1>Welcome to the app</h1>
                    <p>Please click on the link below to activate your account</p>
                    <a href="http://localhost:5000/api/auth/activate/token?=${token}">Activate</a>
                `,
            });
        } catch (error) {
            console.log(error);
        }

        res.status(201).send(user);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

const getUsers = async function (req, res) {
    try {
        const users = await Users.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getUserByID = async function (req, res) {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send
    }
}

const deleteUserByID = async function (req, res) {
    try {
        const user = await Users.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send
    }
}

const UpdateUserByID = async function (req, res) {
    try {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send()
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserByID,
    deleteUserByID,
    UpdateUserByID
}