const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get(`/`, async(req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        res.status(500).json({ success: false });
    }
    res.status(200).send(categoryList);
});

router.get("/:id", async(req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(500).json({
            message: "A categoria com o ID fornecido, não foi encontrada",
        });
    }
    res.status(200).send(category);
});

router.post("/", async(req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    });
    category = await category.save();

    if (!category)
        return res.status(404).send("A categoria não pode ser criada!");

    res.send(category);
});

router.delete("/:id", async(req, res) => {
    Category.findByIdAndRemove(req.params.id)
        .then((category) => {
            if (category) {
                return res.status(200).json({
                    sucess: true,
                    message: "A categoria foi deletada",
                });
            } else {
                return res.status(404).json({
                    sucess: false,
                    message: "A categoria não foi encontrada!",
                });
            }
        })
        .catch((err) => {
            return res.status(400).json({ sucess: false, error: err });
        });
});

module.exports = router;