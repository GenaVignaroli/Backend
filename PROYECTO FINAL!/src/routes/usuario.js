const express = require("express");
const {UserModel} = require("../models/usuario");

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await UserModel.find();
  res.json({ data });
});

router.post('/', async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;

  if (!username || !password || !email || !firstName || !lastName) {
    console.log('Invalid body fields');
    return res.status(400).json({ msg: 'Invalid fields' });
  }

  const userData = {
    username,
    password,
    email,
    firstName,
    lastName,
  };

  const newUser = new UserModel(userData);

  await newUser.save();

  res.json({ data: newUser });
});

module.exports=router;