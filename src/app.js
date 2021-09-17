const express = require('express')
const passport = require('passport')
const User = require('./models/user')


require('./db/mongoose')

//--------------------------------------Route Imports--------------------------------------\\

const userAuthRouter = require('./routers/user/authentication')

//--------------------------------------Route Imports--------------------------------------\\

//--------------------------------------Server Configurations--------------------------------------\\

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(passport.initialize())

//passport config
// require("./config/passport")(passport)
const qurbastatics = require ('qurbastatics')
qurbastatics.passportStrategy(passport,User)

//--------------------------------------Server Configurations--------------------------------------\\

//--------------------------------------Routes--------------------------------------\\

app.use("/api/v1/users/",userAuthRouter)

//--------------------------------------Routes--------------------------------------\\

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})