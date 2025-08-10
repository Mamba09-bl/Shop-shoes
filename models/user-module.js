const mongoose  = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/NEOSTORE")

const userSchema = mongoose.Schema({
    fullname : String,
    email:String,
    password:String,
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"home",
    }],
    cartlatest:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"latest",
    }],
     cartmen:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"men",
    }],
    cartwomen:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"women",
    }]
})

module.exports = mongoose.model("user",userSchema)