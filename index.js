const express=require("express");
const app=express();
const cors = require('cors');
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const authRoute=require("./routes/auth");
const userRoute=require("./routes/users");
const postRoute=require("./routes/posts");
const catRoute=require("./routes/categories");
const multer=require("multer");
const path= require("path");

dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/images",express.static(path.join(__dirname,"/images")));
 
mongoose
.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useFindAndModify:true
})
.then(console.log("Connected to mongoDB"))
.catch((err)=>console.log(err));

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },filename:(req,file,cb)=>{
        cb(null,req.body.name);
    },
})

const upload=multer({storage:storage});

app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File is uploaded");
});

app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/post",postRoute);
app.use("/api/cat",catRoute);

app.listen("5000",()=>{
    console.log("Backend running");
});