const mongoose  = require("mongoose")


const imageSchema = mongoose.Schema({
    image:String,
     productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'home',
  }
})

module.exports = mongoose.model("image",imageSchema)