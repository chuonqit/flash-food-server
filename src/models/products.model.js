const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    newPrice: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    type: {
      type: String,
      enum: ["do-an", "do-uong"],
    },
    attributes: {
      size: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Attribute",
        },
      ],
      topping: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Attribute",
        },
      ],
      ice: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Attribute",
        },
      ],
      sugar: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Attribute",
        },
      ],
    },
  },
  { timestamps: true }
);

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", productSchema);
