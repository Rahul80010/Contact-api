const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user')
const contactRoute = require('./routes/contact')


mongoose.connect('mongodb+srv://rahul1:rahul1@yug.kt56myn.mongodb.net/?appName=YUG')
.then(res=>{console.log("connected to database")})
.catch(err=>{console.log(err)})

app.use(bodyParser.json())

app.use('/user',userRoute)
app.use('/contact',contactRoute)


app.use('*',(req,res)=>{
    res.status(404).json({
        msg:'bad request'
    })
})

module.exports = app