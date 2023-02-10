const mongoose = require('mongoose')
const validator = require('validator')
const { hash, compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const { createToken } = require('../utils/jwt')
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')
const client = require('../utils/redis')
const { Schema } = mongoose
const { sendEmail } = require('../utils/mailer')
const Promotion = require('./promotion')

const userSchema = new Schema(
  {
    lastname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    firstname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['support', 'administation', 'pilot', 'speaker', 'student'],
      required: true,
      default: 'student',
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid')
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error('Password is invalid')
        }
      },
    },
    is_confirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

userSchema.methods.createAuthToken = async function () {
  const fullname =
    this.firstname.charAt(0).toUpperCase() +
    this.firstname.slice(1) +
    ' ' +
    this.lastname.charAt(0).toUpperCase() +
    this.lastname.slice(1)

  const payload = {
    _id: this._id,
    role: this.role,
    email: this.email,
    fullname: fullname,
    lastname: this.lastname,
    firstname: this.firstname,
    is_confirmed: this.is_confirmed,
  }
  return createToken(payload, 60 * 60)
}

userSchema.methods.createToken = async function () {
  const token = CryptoJS.AES.encrypt(this.email, process.env.CRYPTOJS_SECRET).toString()
  await client.set('registerToken', token, 'EX', 60 * 15)
}

userSchema.methods.createValidationEmail = async function (token) {
  try {
    await sendEmail({
      email: this.email,
      subject: 'Welcome to the app',
      message: `
                    <!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Confirmation de compte</title>
    <style type="text/css">
      /* Stylez votre e-mail ici */
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 50px;
      }
      h1 {
        text-align: center;
        color: #333;
      }
      .confirmation-container {
        background-color: #fff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        text-align: center;
        margin: 0 auto;
        width: 600px;
      }
      .confirmation-message {
        font-size: 18px;
        line-height: 1.5;
        color: #333;
        margin-bottom: 30px;
      }
      .confirmation-button {
        display: inline-block;
        padding: 15px 30px;
        background-color: #0077ff;
        color: #fff;
        border-radius: 30px;
        text-decoration: none;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease-in-out;
        margin-top: 30px;
      }
      .confirmation-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
      }
    </style>
  </head>
  <body>
    <div class="confirmation-container">
      <h1>Confirmation de compte</h1>
      <div class="confirmation-message">
        Merci de vous être inscrit! Pour activer votre compte, veuillez cliquer sur le bouton ci-dessous.
      </div>
      <a href="http://localhost:5000/api/auth/activate/token?=${token}" class="confirmation-button">Activer mon compte</a>
    </div>
  </body>
</html>
                `,
    })
  } catch (error) {
    console.log(error)
  }
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Unable to login')
  }
  const isMatch = await compare(password, user.password)
  if (!isMatch) {
    throw new Error('Unable to login')
  }
  return user
}
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await hash(user.password, 10)
  }
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
