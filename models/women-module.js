const mongoose  = require("mongoose")


const womenSchema = mongoose.Schema({
    image:String,
    price:Number,
    name:String,
})

module.exports = mongoose.model("women",womenSchema)