const User = require('../models/user')
const client = require('../utils/redis')
const CryptoJS = require('crypto-js')

const activeAccount = async function (req, res) {
  try {
    // const token = await client.get('registerToken')
    console.log('received token : ' + token)
    let bytes = CryptoJS.AES.decrypt(token, process.env.CRYPTOJS_SECRET)
    let originalText = bytes.toString(CryptoJS.enc.Utf8)
    await User.findOneAndUpdate({ email: originalText }, { is_confirmed: true })
    res.status(301).redirect('http://localhost:5173/')
  } catch (error) {
    return res.status(401).json({ message: 'invalid token' })
  }
}

module.exports = {
  activeAccount,
}
