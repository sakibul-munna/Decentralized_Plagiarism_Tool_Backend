const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");

const Code = mongoose.model(
  "Code",
  new mongoose.Schema({
    author: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    code: {
      type: String,
      required: true,
    },
    date: { type: Date, dafault: Date.now() },
  })
);

function ValidateCode(code) {
  const schema = Joi.object({
    author: Joi.string().min(3).required(),
    code: Joi.string().required(),
  });

  return schema.validate(code);
}

router.get("/", async (req, res) => {
  const codes = await Code.find().sort("date");
  res.send(codes);
});

router.get("/:id", async (req, res) => {
  const code = await Code.findById(req.params.id);
  if (!code) {
    return res
      .status(404)
      .send("The Code-Base with the given ID was not found!");
  }
  res.send(code);
});

router.post("/", async (req, res) => {
  const { error } = ValidateCode(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let code = new Code({
    author: req.body.author,
    code: req.body.code,
    date: req.body.date,
  });
  try {
    code = await code.save();
    res.send(code);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
