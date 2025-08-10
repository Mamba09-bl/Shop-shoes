const express = require("express")
const  router = express.Router()
const bcrypt =  require("bcrypt")
const cookieParser =  require("cookie-parser")
const jwt = require("jsonwebtoken")
const userModel  = require("../models/user-module")
const homeModule = require("../models/home-module")
const upload = require("../config/multer-config");
const image = require("../models/images-module");
const uploads = require("../config/multer-config")
const multipleUpload = require('../config/multer-config');
const latestModule = require("../models/latest-module")
const menModule = require("../models/men-module")
const checkoutModule = require("../models/checkout-module")
const nodemailer = require('nodemailer');
const womenModule = require("../models/women-module")





router.post('/signUp',(req,res)=>{
   let {username,email,password} = req.body
 
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
            const user = await userModel.create({
                username,
                email,
                password:hash
            })
            let token = jwt.sign({email:email,id:user._id},"secret")
            res.cookie("token",token)
            res.redirect("/login")
            console.log(user);
        })
    })
})


router.post("/login",async(req,res)=>{
    let {email,password} = req.body

    let user = await userModel.findOne({email})
  if(!user) return res.status(401).send("Something went wrong")
    

    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            let token = jwt.sign({email:email,id:user._id},"secret")
            res.cookie("token",token)
            res.redirect("/home")
        }else{
            res.send(" wrong")
        }
    })
})

router.post('/create', upload.single("image"), async (req, res) => {

  let {name,price} = req.body

  const user = await homeModule.create({
    name,
    price,
    image:req.file.filename
  })
  res.redirect("/admin")
  console.log(user);
  
});

router.post('/latest', upload.single("image"), async (req, res) => {

  let {name,price} = req.body

  const user = await latestModule.create({
    name,
    price,
    image:req.file.filename
  })
  res.redirect("/admin")
  console.log(user);
  
});


router.post('/men', upload.single("image"), async (req, res) => {

  let {name,price} = req.body

  const user = await menModule.create({
    name,
    price,
    image:req.file.filename
  })
  res.redirect("/admin")
  console.log(user);
  
});

router.post('/women', upload.single("image"), async (req, res) => {

  let {name,price} = req.body

  const user = await womenModule.create({
    name,
    price,
    image:req.file.filename
  })
  res.redirect("/admin")
  // console.log(user);
  
});


router.post("/checkout",async(req,res)=>{
  let {email,firstname,lastname,address} = req.body
  
  

  const user = await checkoutModule.create({
    firstname,
    lastname,
    address,
    email
  }) 
  console.log(user);
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hamza.ahmed.abbasi07@gmail.com",
      pass: "kdwp jglv jedy acij", // never use your real password
    },
  });

  await transporter.sendMail({
    from: "hamza.ahmed.abbasi07@gmail.com",
    to: email, // 👈 Use the user-provided email
    subject: "Oder placed from Shop X",
    text: `Dear ${firstname} ${lastname},

Thank you for shopping with Shop X! We truly appreciate your business.

Here are the details of your order:

Name: ${firstname} ${lastname}
Email: ${email}
Address: ${address}

If you have any questions, feel free to contact us.

Best regards,
The Shop X Team`
  });
  res.redirect("/checkout")
  
})

// d
module.exports = router