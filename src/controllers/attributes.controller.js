const paginatorLabels = require("../configs/paginatorLabels");
const Attribute = require("../models/attributes.model");

module.exports = {
  getAttributes: async (req, res) => {
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

      const paginatorOptions = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        customLabels: paginatorLabels,
        sort: sort,
      };

      if (req.query.page || req.query.limit) {
        const attributes = await Attribute.paginate(query, paginatorOptions);
        res.status(200).json(attributes);
      } else {
        const attributes = await Attribute.find(query).sort(sort).exec();
        res.status(200).json(attributes);
      }
    } catch (error) {
      res.status(500).send("Lấy danh sách thuộc tính thất bại");
    }
  },
  getAttribute: async (req, res) => {
    try {
      const attributes = await Attribute.findOne({ _id: req.params.id }).exec();
      res.status(200).json(attributes);
    } catch (error) {
      res.status(500).send("Lấy thuộc tính thất bại");
    }
  },
  addAttribute: async (req, res) => {
    try {
      const attribute = await new Attribute(req.body).save();
      res.status(201).json(attribute);
    } catch (error) {
      res.status(500).send("Thêm thuộc tính thất bại");
    }
  },
  editAttribute: async (req, res) => {
    try {
      const attribute = await Attribute.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      ).exec();
      res.status(201).json(attribute);
    } catch (error) {
      res.status(500).send("Cập nhật thuộc tính thất bại");
    }
  },
  deleteAttribute: async (req, res) => {
    try {
      const attributes = await Attribute.findOneAndDelete({ _id: req.params.id }).exec();
      res.status(201).json(attributes);
    } catch (error) {
      res.status(500).send("Xóa thuộc tính thất bại");
    }
  },
};
