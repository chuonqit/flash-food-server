const Product = require("../models/products.model");
const Category = require("../models/categories.model");

module.exports = {
  getHomeData: async (req, res) => {
    try {
      const categories = await Category.find({}).limit(10).exec();
      const productsNew = await Product.find({}).sort({ createdAt: -1 }).limit(12).exec();
      const productsPromotion = await Product.find({ newPrice: { $gt: 0 } })
        .limit(12)
        .exec();
      const productsDrink = await Product.find({ type: "do-uong" }).limit(12).exec();
      const productsFood = await Product.find({ type: "do-an" }).limit(12).exec();
      res.status(200).json({
        categories: categories,
        productsNew: productsNew,
        productsPromotion: productsPromotion,
        productsDrink: productsDrink,
        productsFood: productsFood,
      });
    } catch (error) {
      res.status(500).send("Lấy dữ liệu trang chủ thất bại");
    }
  },
};
