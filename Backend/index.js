const port = 4000;
const express = require("express");
const app = express();
const mongoose  = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { error } = require("console");
const router = express.Router();


app.use(express.json());
app.use(cors());

// Database connection with mongoose
mongoose.connect("mongodb+srv://arjun:arjun@cluster0.swf4v.mongodb.net/Ayurcare");

//Api creation 


app.get("/",(req,res)=>{
    res.send("Express App is Running")

})

// image storage engine 

const storage= multer.diskStorage({
    destination : './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
}) 

const upload = multer({storage:storage})

//creating uploading end points  for iamges 
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//schema for creating products 

const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required:true,
    },
    name :{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avilable:{
        type:Boolean,
        default:true,
    },
})

app.post('/addproduct',async (req,res)=>{  

let products = await Product.find({});    // auto gen of id each time 
let id;
if(products.length>0)
{
    let last_product_array =  products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id+1;
}
else {
    id=1;
}

    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();   // auto saving to  db
    console.log("Saved");   
    res.json({
        success:true,
        name:req.body.name, // response generated in jason format 
    })
}) 

//creating api for deleting products

app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name  
    })

})

//creating api for getting all products

app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

// Schema creation for user model

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }   
    
})


// craeating endpoint for registering user
app.post('/signup',async(req,res)=>{

let check = await Users.findOne({email:req.body.email});
if (check) {
    return res.status(400).json({success:false,error:"existing user found with same email id"}) 
}

let cart = {};
for (let i = 0; i < 300; i++) {
   cart[i]=0;
}
const  user = new Users({
    name:req.body.username,
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
})

await user.save();

const data ={
    user:{
        id:user.id
    }
}

const token = jwt.sign(data,'secret_ecom');
res.json({success:true,token})

})
 
// creating end point for user login 

app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user){
        const passCompare = req.body.password === user.password;
        if(passCompare) {
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else {
            res.json({success:false,error:"wrong Password"});
        }
    }
    else{
        res.json({success:false,error:"Wrong Email Id"}) 
    }
})
  
// creating end point for new collection data
app.get('/newcollections',async(req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})
//   // Define the Payment schema
// const paymentSchema = new mongoose.Schema({
//     fullName: String,
//     nickName: String,
//     email: String,
//     dateOfBirth: String,
//     gender: String,
//     paymentMethod: String,
//     cardNumber: String,
//     cvc: String,
//     expDate: String,
//     totalAmount: Number,
//   });
  

//   const Payment = mongoose.model('Payment', paymentSchema);
  
//   // POST route to save payment details
//   app.post('/api/payments', async (req, res) => {
//     try {
//       const { fullName, nickName, email, dateOfBirth, gender, paymentMethod, cardNumber, cvc, expDate, cart, totalAmount } = req.body;
      
//       // Create a new payment record in the database
//       const newPayment = new Payment({
//         fullName,
//         nickName,
//         email,
//         dateOfBirth,
//         gender,
//         paymentMethod,
//         cardNumber,
//         cvc,
//         expDate,
//         cart,
//         totalAmount,    
//       });
      
//       // Save the payment
//       await newPayment.save();
  
//       // Respond back to the frontend
//       res.status(200).json({ message: 'Payment successfully processed' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error processing payment' });
//     }
//   });

const paymentSchema = new mongoose.Schema({
    fullName: String,
    nickName: String,
    email: String,
    dateOfBirth: String,
    gender: String,
    paymentMethod: String,
    cardNumber: String,
    cvc: String,
    expDate: String,
    totalAmount: Number,
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
      }
    ],
  });
  
  const Payment = mongoose.model('Payment', paymentSchema);
  // POST route to save payment details
app.post('/api/payments', async (req, res) => {
    try {
      const {
        fullName,
        nickName,
        email,
        dateOfBirth,
        gender,
        paymentMethod,
        cardNumber,
        cvc,
        expDate,
        cart, // this should contain productId and quantity for each item
        totalAmount,
      } = req.body;
      
      // Create a new payment record in the database
      const newPayment = new Payment({
        fullName,
        nickName,
        email,
        dateOfBirth,
        gender,
        paymentMethod,
        cardNumber,
        cvc,
        expDate,
        totalAmount,
        cart: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
      });
      
      // Save the payment
      await newPayment.save();
  
      // Respond back to the frontend
      res.status(200).json({ message: 'Payment successfully processed' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing payment' });
    }
  });
    
// Endpoint to get all payment records
app.get('/api/payments', async (req, res) => {
    try {
      const payments = await Payment.find(); // Fetch all payment documents
      res.status(200).json(payments); // Send the payment data back as JSON
    } catch (error) {
      console.error('Error fetching payment data:', error);
      res.status(500).json({ message: 'Error fetching payment data' });
    }
  });
  

// models/Order.js

const orderSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;



app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', orderId: newOrder._id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

module.exports = router;    

// app.post('/api/orders', async (req, res) => {
//     try {
//       const newOrder = new Order(req.body);  // Including cartItems in the order
//       await newOrder.save();
//       res.status(201).json({ message: 'Order created successfully', orderId: newOrder._id });
//     } catch (error) {
//       console.error('Error creating order:', error);
//       res.status(500).json({ message: 'Error creating order' });
//     }
//   });
  



// const orderSchema = new mongoose.Schema({
//   fullName: String, // Customer's full name
//   email: String, // Customer's email address
//   items: [{
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Product ID
//     quantity: { type: Number, required: true }, // Quantity of the product
//     price: { type: Number, required: true }, // Price of the product
//     totalAmount: { type: Number, required: true }, // Total amount for this item (quantity * price)
//   }],
//   totalAmount: { type: Number, required: true }, // Total amount for the entire order (sum of item totals)
//   status: { type: String, default: 'Pending' }, // Order status (Pending, Shipped, Delivered)
//   createdAt: { type: Date, default: Date.now }, // Date of order creation
// });

// const Order = mongoose.model('Order', orderSchema);

// module.exports = Order;

// //
// app.post('/api/orders', async (req, res) => {
//     try {
//         const { fullName, email, items } = req.body;
        
//         // Calculate total amount for items
//         const orderItems = items.map(item => ({
//             productId: item.productId,
//             quantity: item.quantity,
//             price: item.price,
//             totalAmount: item.price * item.quantity,
//         }));

//         // Calculate totalAmount for the entire order
//         const totalAmount = orderItems.reduce((acc, item) => acc + item.totalAmount, 0);

//         // Create a new order
//         const order = new Order({
//             fullName,
//             email,
//             items: orderItems,
//             totalAmount,
//             status: 'Pending', // Default status
//         });

//         await order.save(); // Save the order in the database
//         res.status(201).json({ message: 'Order created successfully', order });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error creating order' });
//     }
// });

// module.exports = router;









//crating end point for new collection
app.get('/newcollection',async(req,res)=>{
    let product  = await Product.find({});
    let newcollection = product.slice(1).slice(-8);
    console.log("NewCollection Fetched ");
    res.send(newcollectiion);
})

// creating end point for popular in market  section
app.get('/popularinmarket',async(req,res)=>{
  let products = await Product.find({category:"root"});
  let popular_in_market = products.slice(0,4);
    console.log("Popular in root fetched");
    res.send(popular_in_market);
})


//creating middleware to fetch user
const fetchUser = async(req,res,next)=>{
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({errors:"Please authicate using valid tokens"})
    }
    else{
        try {
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"please authicate using a valid token"})
        }
    }

}

//creating end point for adding products in cart data
// app.post('/addtocart',fetchUser,async(req,res)=>{

//     let userData = await Users.findOne({ _id: req.user.id });
//     userData.cartData[req.body.itemId] +=1;
//     await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cart.cartData});
//     res.send("Added")
// })
app.post('/addtocart', fetchUser, async (req, res) => {
    // Retrieve user by ID
    let userData = await Users.findOne({ _id: req.user.id });

    // Initialize `cart` and `cartData` if they don’t exist
    if (!userData.cart) {
        userData.cart = { cartData: {} };
    } else if (!userData.cart.cartData) {
        userData.cart.cartData = {};
    }

    // Increment the quantity for the specific item or initialize it to 1 if it doesn’t exist
    const itemId = req.body.itemId;
    if (userData.cart.cartData[itemId]) {
        userData.cart.cartData[itemId] += 1;
    } else {
        userData.cart.cartData[itemId] = 1;
    }

    // Update the user’s cartData in the database
    await Users.findOneAndUpdate(
        { _id: req.user.id },
        { cart: userData.cart }
    );

    // Send success response
    res.send("Added to cart successfully");
});





app.get('/user', (req, res) => {
    // Assuming user is authenticated and their info is in the session
    const user = req.user; // The logged-in user information from the session
    if (user) {
      res.json({
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  });
  

app.listen(port,(error)=>{
    if (!error) {
        console.log("Server running on port "+port)  
    }
    else 
    {
        console.log("Error :"+error)
    }

}) 

