const Users = require('../models/user')
const { sendEmail } = require('../utils/mailer')
const CryptoJS = require('crypto-js')
const client = require('../utils/redis')
const bcrypt = require('bcrypt')
const fs = require('fs')

const createUser = async function (req, res) {
  try {
    const user = new Users(req.body)
    await user.save()
    fs.mkdirSync(`./${user.lastname}_${user.firstname}`, { recursive: true })
    user.createToken()
    const token = await client.get('registerToken')
    console.log(token)
    user.createValidationEmail(token)
    res.status(201).send(user)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}

const getUsers = async function (req, res) {
  try {
    const users = await Users.find({})
    res.send(users)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getUserByID = async function (req, res) {
  try {
    const user = await Users.findById(req.params.id)
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (error) {
    res.status(500).send
  }
}

const deleteUserByID = async function (req, res) {
  try {
    const user = await Users.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (error) {
    res.status(500).send
  }
}

const UpdateUserByID = async function (req, res) {
  try {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (error) {
    res.status(500).send()
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserByID,
  deleteUserByID,
  UpdateUserByID,
}
