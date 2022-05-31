const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    nameAscii: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["do-an", "do-uong"],
    },
  },
  { timestamps: true }
);

categorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Category", categorySchema);
