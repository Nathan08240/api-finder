const mongoose = require("mongoose");
const { Schema } = mongoose;
const unidecode = require("unidecode");

const promotionSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      required: true,
      trim: true,
      lowercase: true,
    },
    reference: {
      type: String,
      required: true,
      length: 8,
      unique: true,
    },
    referent: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

promotionSchema.pre("save", async function (next) {
  this.name = unidecode(this.name.replace(/ /g, "_"));
  next();
});

const Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = Promotion;
