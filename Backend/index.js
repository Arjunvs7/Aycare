const port = 4000;
const express = require("express");
const app = express();
const mongoose  = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

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
        return cb(null,`${field.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
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

app.listen(port,(error)=>{
    if (!error) {
        console.log("Server running on port "+port)  
    }
    else 
    {
        console.log("Error :"+error)
    }

})

