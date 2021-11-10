const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

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
