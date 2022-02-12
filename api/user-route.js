const express = require("express");
const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

// Import des models
const User = require("../models/User");

function generateSalt() {
  const salt = uid2(16);
  return salt;
}

function generateHash(salt, password) {
  const hash = SHA256(password + salt).toString(encBase64);
  return hash;
}

function generateToken() {
  const token = uid2(16);
  return token;
}

async function getUser(emailv) {
  // find all documents named john and at least 18
  // await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();
  const user = await User.find({ email: emailv }).exec();

  return user;
}

//  SIGNUP
router.post("/user/signup", async (req, res) => {
  try {
    const salt2 = generateSalt();
    const hash2 = generateHash(salt2, req.fields.password);
    const token2 = generateToken();

    const isEmlil = isEmail(req.fields.email);

    const objet_doc = {
      username: req.fields.username,
      email: req.fields.email,
      hash: hash2,
      salt: salt2,
      token: token2,
    };

    if (isEmlil) {
      res.json({ message: "Email existe déjà !!!" });
    } else {
      const newUser = new User(objet_doc); // ODM Object Document Mapper
      await newUser.save();
      //await User.create(doc);
      res.json({ message: "User Created" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// LOGIN
router.post("/user/signin", async (req, res) => {
  const email = req.fields.email;
  const password = req.fields.password;
  const objetuser = await getUser(email);

  objetuser.map((e) => {
    console.log("salt: " + e.salt);
    console.log("hash: " + e.hash);
    console.log("token:" + e.token);
    const hash = generateHash(e.salt, password);
    if (e.hash === hash) {
      res.json(e.token);
    } else {
      res.json("Unauthorized");
    }
  });
});

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

async function isEmail(emailvalue) {
  console.log(emailvalue);
  const users = await User.find({ email: emailvalue });
  users.map((doc) => {
    console.log("-->" + doc.email);
    return true;
  });
  console.log("false");
  return false;
}

module.exports = router;
