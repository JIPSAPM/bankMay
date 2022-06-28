//server creation

//1. import express
const express = require('express')
//import jsonwebtoken
const jwt = require("jsonwebtoken")
//import cors
const cors = require('cors')

//import data service
const dataService = require('./services/data.service')

//server app creat using express
const app = express()

//cors using server app
app.use(cors({
    origin:'http://localhost:4200'
}))

//parse JSON data
app.use(express.json())

//application specific middleware
const appMiddleware = (req, res, next) => {
    console.log("Application specific middleware");
    next()
}
//use middleware in app
app.use(appMiddleware)

//bank server

const jwtMiddleware = (req, res, next) => {
    //fetch token
    try {
        token = req.headers['x-access-token']
        //verify token
        const data = jwt.verify(token, 'superkey12345')
        console.log(data);
        next()
    }
    catch {
        res.status(401).json({
            status: false,
            statusCode: 401,
            message: 'Please login'
        })
    }
}

//register  API
app.post('/register', (req, res) => {

    //register resolving - asynchronus
    const result = dataService.register(req.body.username, req.body.acno, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

//login api
app.post('/login', (req, res) => {
    //login resolving
    dataService.login(req.body.acno, req.body.pswd)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

//deposit api
app.post('/deposit', jwtMiddleware, (req, res) => {
    //deposit resolving
    dataService.deposit(req.body.acno, req.body.password, req.body.amt)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

//withdraw api
app.post('/withdraw', jwtMiddleware, (req, res) => {
    //withdraw resolving
    dataService.withdraw(req.body.acno, req.body.password, req.body.amt)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

//transaction api
app.post('/transaction', jwtMiddleware, (req, res) => {
    //transaction resolving
    dataService.getTransaction(req.body.acno)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

//user request resolving

//GET REQUEST -to fetch data
app.get('/', (req, res) => {
    res.send("GET Request")
})

//POST REQUEST -to creat data in server 
app.post('/', (req, res) => {
    res.send("POST Request")
})

//PUT -to modify entire data
app.put('/', (req, res) => {
    res.send("PUT Request")
})

//PATCH -to modify partiality
app.patch('/', (req, res) => {
    res.send("PATCH Request")
})

//DELETE RESQUEST -to delete data
app.delete('/', (req, res) => {
    res.send("DELETE Request")
})

//SET UP PORT NUMBER TO SERVER APP
app.listen(3000, () => {
    console.log("server started at 3000");
})
