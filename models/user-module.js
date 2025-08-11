const mongoose  = require("mongoose")
mongoose.connect(
  "mongodb+srv://hamzaahmed:hamza123@cluster0.k8hovee.mongodb.net/NEOSTORE?retryWrites=true&w=majority&appName=Cluster0"
);
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
