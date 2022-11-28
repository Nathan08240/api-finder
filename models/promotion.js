const mongoose = require('mongoose');
const User = require('./user');
const {Schema} = mongoose;

const promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    referance: {
        type: String,
        required: true,
        unique: true,
    },
    User: {
        type: User
    },
}, {timestamps: true});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;