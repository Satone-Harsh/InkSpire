const router=require("express").Router();
const Cat=require("../models/Category");

router.post("/", async(req,res)=>{
    const newCat= new Cat(req.body);
    try{
        const saved=await newCat.save();
        res.status(200).json(saved);
    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/", async(req,res)=>{
    try{
        const cats=await Cat.find();
        res.status(200).json(cats);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports=router;