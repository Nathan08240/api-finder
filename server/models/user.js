const mongoose = require('mongoose');
const validator = require('validator');
const {Schema} = mongoose;

const userSchema = new Schema({
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
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Password is invalid');
            }
        }
    },
    is_confirmed: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;