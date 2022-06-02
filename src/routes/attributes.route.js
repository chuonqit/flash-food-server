const express = require("express");
const router = express.Router();

const {
  getAttributes,
  getAttribute,
  addAttribute,
  deleteAttribute,
  editAttribute,
  getAttributesType,
} = require("../controllers/attributes.controller");

router.get("/attributes", getAttributes);
router.get("/attributes/products/:parentType", getAttributesType);
router.get("/attributes/:id", getAttribute);
router.post("/attributes", addAttribute);
router.put("/attributes/:id", editAttribute);
router.delete("/attributes/:id", deleteAttribute);

module.exports = router;
