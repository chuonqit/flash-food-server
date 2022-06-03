const paginatorLabels = require("../configs/paginatorLabels");
const Product = require("../models/products.model");

const populate = [
  "category",
  "attributes.size",
  "attributes.topping",
  "attributes.ice",
  "attributes.sugar",
];

module.exports = {
  getProducts: async (req, res) => {
    try {
      const query = {};
      const sort = {};

      if (req.query.sort_by) {
        if (req.query.sort_by == "high-price") {
          sort.price = -1;
        } else if (req.query.sort_by == "low-price") {
          sort.price = 1;
        } else if (req.query.sort_by == "new-date") {
          sort.createdAt = -1;
        } else if (req.query.sort_by == "old-date") {
          sort.createdAt = 1;
        }
      }

      if (req.query.keyword) {
        query.name = { $regex: new RegExp(req.query.keyword), $options: "i" };
      }
      if (req.query.filter_by) {
        if (req.query.filter_by == "do-an") {
          query.type = "do-an";
        } else if (req.query.filter_by == "do-uong") {
          query.type = "do-uong";
        }
      }

      const paginatorOptions = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        customLabels: paginatorLabels,
        populate: populate,
        sort: sort,
      };

      if (req.query.page || req.query.limit) {
        const products = await Product.paginate(query, paginatorOptions);
        res.status(200).json(products);
      } else {
        const products = await Product.find(query).populate(populate).sort(sort).exec();
        res.status(200).json(products);
      }
    } catch (error) {
      res.status(500).send("Lấy danh sách sản phẩm thất bại");
    }
  },
  getProduct: async (req, res) => {
    try {
      const products = await Product.findOne({ _id: req.params.id }).exec();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).send("Lấy sản phẩm thất bại");
    }
  },
  addProduct: async (req, res) => {
    console.log(req.body);
    try {
      const product = await new Product(req.body).save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).send("Thêm sản phẩm thất bại");
    }
  },
  editProduct: async (req, res) => {
    try {
      const product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      ).exec();
      res.status(200).json(product);
    } catch (error) {
      res.status(500).send("Cập nhật sản phẩm thất bại");
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const products = await Product.findOneAndDelete({ _id: req.params.id }).exec();
      res.status(201).json(products);
    } catch (error) {
      res.status(500).send("Xóa sản phẩm thất bại");
    }
  },
  searchProducts: async (req, res) => {
    try {
      const products = await Product.find({
        name: { $regex: new RegExp(req.body.keyword), $options: "i" },
      })
        .populate(populate)
        .limit(5)
        .exec();
      console.log(products);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).send("Tìm kiếm sản phẩm thất bại");
    }
  },
  promotionProducts: async (req, res) => {
    try {
      const products = await Product.find({ newPrice: { $gt: 0 } })
        .populate(populate)
        .exec();
      console.log(products);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).send("Lấy sản phẩm thất bại");
    }
  },
};
