const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://sriharish192004:sriharish333@cluster1.yyael5i.mongodb.net/e-commerce");

// API CREATION
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Creating upload endpoints for images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema for creating products
const Product = mongoose.model("Product", {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
});

// API for adding product
app.post('/addproduct', async (req, res) => {
    try {
        let products = await Product.find({});
        let id;

        if (products.length > 0) {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id + 1;
        } else {
            id = 1;
        }

        const newProduct = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        console.log(newProduct);
        await newProduct.save();
        console.log("saved");

        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (err) {
        console.error("Error adding product:", err);
        res.status(500).json({ success: false, error: "Failed to add product" });
    }
});

// API for deleting product
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    });
});

// API for getting all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All products are fetched");
    res.send(products);
});

// Schema Creating for User model
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// Endpoint for registering the user
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Existing User found" });
    }

    let cart = {};
    for (let index = 0; index < 300; index++) {
        cart[index] = 0;
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart, // ✅ fixed typo
    });

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    };

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
});
//Creating endpoint for user login
app.post('/login',async(req,res)=>{
    let user=await Users.findOne({email:req.body.email});
    if(user){
        const passCompare=req.body.password===user.password;
        if(passCompare){
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,'secret-ecom');
            res.json({success:true,token});
        }
        else{
            res.json({sucess:false,errors:"Wrong password"});
        }
    }
    else{
        res.json({success:false,errors:"Wrong email Id"})
    }
})
// creating endpoint for newcollection data
app.get('/newcollections',async(req,res)=>{
    let products=await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);

})
//creating endpoint for popular in women category
app.get('/popularwomen',async(req,res)=>{
    let products= await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
    
})
//creating middleware to fetch user
const fectchUser = async(req,res, next)=>{
    const token = req.header('auth-token');
    console.log("User token", token);
    if(!token){
         return res.status(401).send({errors:"Please authenticate using valid token "})
    }
    else{
        try {
            const data=jwt.verify(token,'secret-ecom');
            req.user=data.user;
            next();
            
        } catch (error) {
            console.error(error)
            res.status(401).send({errors:"Please authenticate using a valid token"})
            
        }
    }

}
//creating endpoint for adding products in cartdata
app.post('/addtocart', fectchUser, async (req, res) => {
    try {
        let user = await Users.findById(req.user.id);
        let itemId = String(req.body.itemId);

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        console.log("Item ID", itemId)
        console.log("User cart", user.cartData[itemId]);
        // Increase the count of that item in cart
        user.cartData[itemId] = (user.cartData[itemId] || 0) + 1;
        
        console.log("User cart after update", user.cartData[itemId]);
        
        user.markModified('cartData');
        await user.save();

        console.log("Cart Updated:", user.id);
        res.json({ success: true, cartData: user.cartData, itemId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});
//creating endpoint to remove product from cardata
app.post('/removefromcart',fectchUser,async(req,res)=>{
    try {
        let user = await Users.findById(req.user.id);
        let itemId = String(req.body.itemId);

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        console.log("Item ID", itemId)
        console.log("User cart", user.cartData[itemId]);
        // Increase the count of that item in cart
        user.cartData[itemId] = (user.cartData[itemId] || 0) - 1;
        
        console.log("User cart after update", user.cartData[itemId]);
        
        user.markModified('cartData');
        await user.save();

        console.log("Cart Removed:", user.id);
        res.json({ success: true, cartData: user.cartData, itemId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
    


})
//creating endpoint to get cartdata
app.post('/getcart', fectchUser, async (req, res) => {
    console.log("GetCart");
    try {
        let userData = await Users.findById(req.user.id);  // ✅ FIXED
        if (!userData) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        res.json(userData.cartData);
    } catch (err) {
        console.error("Error fetching cart:", err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


// Start server
app.listen(port, (err) => {
    if (err) {
        console.error("Error: " + err);
    } else {
        console.log("Server running on port " + port);
    }
});
