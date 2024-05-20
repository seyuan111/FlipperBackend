const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./Model/UserModel')
require('dotenv').config()
const port = process.env.PORT || 7000;

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGOURL)
.then(() => console.log("connection successful"))
.catch(() => console.log("error connecting to mongodb"))

app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
  
      if (user) {
        if (user.password === password) {
          res.json("success");
        } else {
          res.json("incorrect password");
        }
      } else {
        res.json('user does not exist');
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.post("/signup", async (req, res) => {
    try {
      const user = await UserModel.create(req.body);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(port, () => {
    console.log(`successfully connected to port ${port}`)
})