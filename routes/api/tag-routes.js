const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: "products" }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ moedl: Product, through: ProductTag, as: "products" }],
    });
    if (!tagData) {
      res.status(404).json({ message: "No tags found with ID" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status.apply(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
