const express = require('express')
const runDB = require('./DB/config/connectDB')
var cors = require('cors')

const { userRouter, noteRouter,  } = require('./router/router')
const app = express()
require('dotenv').config()
app.use(cors())
const port = process.env.port
app.use(express.json())

app.use(userRouter,noteRouter)
app.all('*',(req,res)=>{
  res.json({message:"in-valid URL"})
})
runDB()

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
