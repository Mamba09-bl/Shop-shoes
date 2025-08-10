const express = require("express")
const router = express.Router()
const homeModule = require("../models/home-module")
const imageModule = require("../models/images-module")
const latestModule = require("../models/latest-module")
const menModule = require("../models/men-module")
const userModule = require("../models/user-module")
const womenModule = require("../models/women-module")



router.get("/",(req,res)=>{
    res.render("signUp")
})

router.get("/login",(req,res)=>{
    res.render("login")
})

router.get("/home",async(req,res)=>{
     const latest = await latestModule.find({})
     const home = await homeModule.find({})
     
     
    res.render("home",{home,latest})
})

router.get("/admin",(req,res)=>{
    res.render("admin")
})

router.get("/views/:id",async(req,res)=>{
    const productId = req.params.id;
    const home = await homeModule.find({_id: productId})
    //  console.log(img);
    res.render("views",{home})
})

router.get("/images",async(req,res)=>{
     const home = await imageModule.find({})
    res.render("images",{home})
})

router.get("/men",async(req,res)=>{
    const men = await menModule.find({})
    res.render("men",{men})
})


router.get("/cart",async(req,res)=>{
  const user = await userModule
    .findOne({})
    .populate("cart")        // Populates home products
    .populate("cartlatest").populate("cartmen").populate("cartwomen"); // Populates latest products
    
    // console.log(user)
    let bill = 0
    user.cart.forEach((product)=>{
        bill += product.price
    })
user.cartlatest.forEach((product)=>{
        bill += product.price
    })


    user.cartmen.forEach((product)=>{
        bill += product.price
    })


    user.cartwomen.forEach((product)=>{
        bill += product.price
    })

    
    res.render("cart",{cart:user.cart,bill,
        cartlatest:user.cartlatest,
        cartmen:user.cartmen,
        cartwomen:user.cartwomen
    })
})

router.get('/addtocart/:id',async(req,res)=>{
    const user = await userModule.findOne({})
    // console.log(user);

    user.cart.push(req.params.id)
    user.cartlatest.push(req.params.id)
    await user.save()
    res.redirect("/home")
    

    
})

router.get("/addedtocart/:id",async(req,res)=>{
    const user = await userModule.findOne({})
    // console.log(user);

    
    user.cartwomen.push(req.params.id)
    res.redirect("/women")
    await user.save()
})

router.get('/addcart/:id',async(req,res)=>{
    const user = await userModule.findOne({})
    // console.log(user);

    user.cartmen.push(req.params.id)
    await user.save()
    res.redirect("/men")
})

router.get("/delete/:id",async(req,res)=>{
    const user  = await userModule.findOne({})
    if (!user) {
        console.log("User not found");
        return res.redirect("/cart");
    }
    const index =  user.cartmen.indexOf(req.params.id)
    user.cartmen.splice(index, 1); // remove 1 item at that position

    const indexcart =  user.cart.indexOf(req.params.id)
    user.cart.splice(indexcart, 1); // remove 1 item at that position

    const indexlatest =  user.cartlatest.indexOf(req.params.id)
    user.cartlatest.splice(indexlatest, 1); // remove 1 item at that position

    const indexwomen =  user.cartwomen.indexOf(req.params.id)
    user.cartwomen.splice(indexlatest, 1); // remove 1 item at that position
    console.log(index);
    

await user.save();
    
    res.redirect("/cart")
    
    // const user = await userModule.cart.findOneAndDelete({re})
})

router.get("/checkout",(req,res)=>{
    res.render("checkout")
})

router.get("/women",async(req,res)=>{
    const women = await womenModule.find({})
    console.log(women);
    
    res.render("women",{women})
})

router.get("/chat",(req,res)=>{
    res.render('chat')
})


module.exports = router