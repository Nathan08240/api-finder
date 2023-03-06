const mongoose = require('mongoose')
const { Schema } = mongoose

const promotionSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      required: true,
    },
    reference: {
      type: String,
      required: true,
      length: 8,
      unique: true,
    },
    referent: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

const Promotion = mongoose.model('Promotion', promotionSchema)

module.exports = Promotion
