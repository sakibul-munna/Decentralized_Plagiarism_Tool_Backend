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
