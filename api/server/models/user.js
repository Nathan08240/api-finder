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
    this.lastname.charAt(0).toUpperCase() +
    this.lastname.slice(1) +
    ' ' +
    this.firstname.charAt(0).toUpperCase() +
    this.firstname.slice(1)
  const payload = {
    id: this.id,
    role: this.role,
    email: this.email,
    lastname: this.lastname,
    firstname: this.firstname,
    fullname: fullname,
    is_confirmed: this.is_confirmed,
  }
  return createToken(payload, 60 * 60)
}

userSchema.methods.createToken = async function () {
  const token = CryptoJS.AES.encrypt(
    this.email,
    process.env.CRYPTOJS_SECRET
  ).toString()
  await client.set('registerToken', token, 'EX', 60 * 15)
}

userSchema.methods.createValidationEmail = async function (token) {
  try {
    await sendEmail({
      email: this.email,
      subject: 'Welcome to the app',
      message: `
                    <h1>Activation de votre compte</h1>
                    <p>Vous pouvez activer votre compte en cliquant sur le lien ci-dessous</p>
                    <a href="http://localhost:5000/api/auth/activate/token?=${token}">Activation</a>
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
