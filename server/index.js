const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const User = require("./models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt=require("bcryptjs")
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/register-user').then()

app.post("/api/register", async (req, res) => {
    console.log(req.body)
    try {
        const newPassword=await bcrypt.hash(req.body.password,10)
      await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        })
        res.send({status: "ok"})
    } catch (error) {
        res.send({status: "error", error: 'Duplicate use'})
    }
})
app.post("/api/login", async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,

    })
    if (!user){
        return {status:'error',error:'Invalid login'}
    }
    const isPasswordValid=await bcrypt.compare(req.body.password)
    if (isPasswordValid) {
        const token = jwt.sign({
            name: user.name,
            email: user.email

        }, 'secret123')
        return res.send({status: "ok", user: token})
    } else {
        res.send({status: "error", user: false})
    }

    console.log(user)
})
app.get("/api/home", async (req, res) => {
    const token = req.header['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.findOne({email: email})
        return {status: "ok", quote: user.quote}
    } catch (error) {
        console.log(error)
        res.send({status: "error", error: "invalid token"})
    }
})
app.post("/api/home", async (req, res) => {
    const token = req.header['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        await User.updateOne({email: email}, {
            $set: {quote: req.body.quote}
        })
        return res.send({status: "ok"})
    } catch (error) {
        console.log(error)
        res.send({status: "error", error: "invalid token"})
    }
})
app.listen(3001, () => {
    console.log("server started on 3001")
})