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

app.post('/login', (req,res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("success")
            }else{
                res.json("incorrect password")
            }
        }else{
            res.json('user does not exist')
        }
    })
})

app.post("/signup", (req,res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

app.listen(port, () => {
    console.log(`successfully connected to port ${port}`)
})