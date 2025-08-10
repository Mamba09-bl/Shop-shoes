const mongoose  = require("mongoose")


const homeSchema = mongoose.Schema({
    image:String,
    price:Number,
    name:String,
    latestimage:String
})

module.exports = mongoose.model("home",homeSchema)