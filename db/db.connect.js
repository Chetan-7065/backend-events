const mongoose = require("mongoose")
require("dotenv").config()

const MONGODB = process.env.MONGODB

const intializeDatabase = async () => {
  await mongoose.connect(MONGODB).then(() => {
    console.log("Connected Successfully")
  }).catch((error) => {
    console.log("Connection Failed", error)
  })
}

module.exports = {intializeDatabase}