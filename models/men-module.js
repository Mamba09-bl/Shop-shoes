const mongoose  = require("mongoose")


const menSchema = mongoose.Schema({
    image:String,
    price:Number,
    name:String,
})

module.exports = mongoose.model("men",menSchema)