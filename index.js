const express = require("express");
const app = express();
const mongoose = require("mongoose");

const codes = require("./routes/codes");

app.use(express.json());
app.use("/api/codes", codes);

mongoose
  .connect("mongodb://localhost/decPlagTool")
  .then(() => console.log("Connected to MongoDB Database ...."))
  .catch((err) =>
    console.error("Could not connect to MongoDB Database ...." + err.message)
  );

app.get("/", (req, res) => {
  res.send("Welcome to the back-end of Decentralized_Plagiarism_Tool !!!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}...`);
});
