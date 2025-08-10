const mongoose  = require("mongoose")


const checkoutSchema = mongoose.Schema({
  email:String,
  firstname:String,
  lastname:String,
  address:String,
  city:String,
})

module.exports = mongoose.model("checkout",checkoutSchema)