const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

const productRouter = require("./routes/products.route");
const categoryRouter = require("./routes/categories.route");
const attributeRouter = require("./routes/attributes.route");

app.use(morgan("tiny"));
app.use(express.json({ limit: "50mb" }));
dotenv.config({ path: __dirname + "/configs/settings.env" });

app.use(cors());

mongoose
  .connect(process.env.MONGODB_ONLINE)
  .then(() => console.log("MONGODB connected successfully"))
  .catch((error) => console.log(error));

app.use("/api", productRouter);
app.use("/api", attributeRouter);
app.use("/api", categoryRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
