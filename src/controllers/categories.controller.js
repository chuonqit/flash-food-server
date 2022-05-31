const paginatorLabels = require("../configs/paginatorLabels");
const Category = require("../models/categories.model");
const slugify = require("slugify");
const Product = require("../models/products.model");

module.exports = {
  getCategories: async (req, res) => {
    try {
      const query = {};
      const sort = {};

      if (req.query.sort_by) {
        if (req.query.sort_by == "new-date") {
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
        sort: sort,
      };

      if (req.query.page || req.query.limit) {
        const categories = await Category.paginate(query, paginatorOptions);
        res.status(200).json(categories);
      } else {
        const categories = await Category.find(query).sort(sort).exec();
        res.status(200).json(categories);
      }
    } catch (error) {
      res.status(500).send("Lấy danh sách danh mục thất bại");
    }
  },
  getCategory: async (req, res) => {
    try {
      const category = await Category.findOne({ _id: req.params.id }).exec();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).send("Lấy danh mục thất bại");
    }
  },
  getCategoryByType: async (req, res) => {
    try {
      const category = await Category.findOne({ type: req.params.type }).exec();
      const products = await Product.find({ category: category._id }).exec();
      res.status(200).json({
        category,
        products,
      });
    } catch (error) {
      res.status(500).send("Lấy sản phẩm thất bại");
    }
  },
  getCategoryByAscii: async (req, res) => {
    try {
      const category = await Category.findOne({ nameAscii: req.params.nameAscii }).exec();
      const products = await Product.find({ category: category._id }).exec();
      res.status(200).json({
        category,
        products,
      });
    } catch (error) {
      res.status(500).send("Lấy sản phẩm thất bại");
    }
  },
  addCategory: async (req, res) => {
    try {
      const category = await new Category({
        nameAscii: slugify(req.body.name.toLowerCase()),
        ...req.body,
      }).save();
      res.status(201).json(category);
    } catch (error) {
      res.status(500).send("Thêm danh mục thất bại");
    }
  },
  editCategory: async (req, res) => {
    try {
      const category = await Category.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      ).exec();
      res.status(201).json(category);
    } catch (error) {
      res.status(500).send("Cập nhật danh mục thất bại");
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findOneAndDelete({ _id: req.params.id }).exec();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).send("Xóa danh mục thất bại");
    }
  },
};
