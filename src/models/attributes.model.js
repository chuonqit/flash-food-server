const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const attributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["size", "topping", "ice", "sugar"],
    },
    parentType: {
      type: String,
      required: true,
      enum: ["do-an", "do-uong"],
    },
  },
  { timestamps: true }
);

attributeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Attribute", attributeSchema);
