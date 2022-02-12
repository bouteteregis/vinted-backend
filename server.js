import express from "express";
import cors from "cors";
import "dotenv/config";
import fs from "fs";
const formidableMiddleware = require("express-formidable");
const mongoose = require("mongoose");

const app = express();
app.use(cors());

app.use(formidableMiddleware());

mongoose.connect(
  "mongodb://admin:password@localhost:27017/dbvinted?authSource=admin&directConnection=true&serverSelectionTimeoutMS=2000",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//  "Bienvenue sur l'API de Vinted"
app.get("/", (req, res) => {
  return "Bienvenue sur l'API de Vinted";
});

app.get("/offers", (req, res) => {
  fs.readFile("./db-vinted.jk/,>.json", "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`);
    } else {
      // parse JSON string to JSON object
      const databases = JSON.parse(data);
      return res.json(databases);
    }
  });
});

// Import des routes
const studentRoutes = require("./api/user-route");
app.use(studentRoutes);

app.listen(process.env.PORT || 3200, () => {
  console.log("Server started PORT " + process.env.PORT);
});
