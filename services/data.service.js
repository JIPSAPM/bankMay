//import jsonwebtoken
const jwt = require("jsonwebtoken")

//import db.js
const db = require('./db')

//DATA BASE
// db = {
//   1000: { "acno": 1000, "username": "never", "password": 1000, "balance": 5000, transaction: [] },
//   1001: { "acno": 1001, "username": "laisha", "password": 1001, "balance": 5000, transaction: [] },
//   1002: { "acno": 1002, "username": "vypn", "password": 1002, "balance": 3000, transaction: [] }
// }

//register
const register = (username, acno, password) => {
  //asynchronus
  return db.User.findOne({
    acno
  }).then(user => {
    console.log(user);
    if (user) {
      return {
        status: false,
        message: "Already register....please log In",
        statusCode: 401
      }
    }
    else {
      //insert in db
      const newUser = new db.User({
        acno,
        username,
        password,
        balance: 0,
        transaction: []
      })
      newUser.save()
      return {
        status: true,
        message: "registered successfully",
        statusCode: 200
      }
    }
  })
}

//login
const login = (acno, pswd) => {
  //asynchronus
  return db.User.findOne({
    acno,
    password: pswd
  }).then(user => {
    if (user) {
      console.log(user);
      currentUser = user.username
      currentAcno = acno
      //token generation
      token = jwt.sign({
        //store acno inside token
        currentAcno: acno
      }, 'superkey12345')

      return {
        status: true,
        message: "login successful",
        statusCode: 200,
        currentUser,
        currentAcno,
        token
      }
    }

    else {
      return {
        status: false,
        message: "invalid account number or password !!",
        statusCode: 401

      }
    }
  })
}

//deposit
const deposit = (acno, password, amt) => {
  var amount = parseInt(amt)
  //asynchronus
  return db.User.findOne({
    acno, password
  }).then(user => {
    if (user) {
      user.balance += amount
      user.transaction.push({
        type: "CREDIT",
        amount: amount
      })
      user.save()
      return {
        status: true,
        message: amount + " deposit successfully and new balance is: " + user.balance,
        statusCode: 200
      }
    }
    else {
      return {
        status: false,
        message: "invalid account number or password !!",
        statusCode: 401
      }
    }
  })
}

//withdraw
const withdraw = (acno, password, amt) => {
  var amount = parseInt(amt)
  //asynchronus
  return db.User.findOne({
    acno, password
  }).then(user => {
    if (user) {
      if (user.balance > amount) {
        user.balance -= amount
        user.transaction.push({
          type: "DEBIT",
          amount: amount
        })
        user.save()
        return {
          status: true,
          message: amount + " debitted successfully and new balance is: " + user.balance,
          statusCode: 200
        }
      }
      else {
        return {
          status: false,
          message: "insufficient balance!!",
          statusCode: 401
        }
      }
    }
    else {
      return {
        status: false,
        message: "invalid account number or password!",
        statusCode: 401
      }
    }
  })
}
//transaction
const getTransaction = (acno) => {
  //asynchronus
  return db.User.findOne({
    acno
  }).then(user => {
    if (user) {
      return {
        status: true,
        satusCode: 200,
        transaction: user.transaction
      }
    }
    else {
      return {
        status: false,
        message: "user does not exist!!",
        statusCode: 401
      }
    }
  })
}



//export
module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction
}