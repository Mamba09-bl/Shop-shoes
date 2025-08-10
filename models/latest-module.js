const mongoose  = require("mongoose")


const latestSchema = mongoose.Schema({
    image:String,
    price:Number,
    name:String,
})

module.exports = mongoose.model("latest",latestSchema)