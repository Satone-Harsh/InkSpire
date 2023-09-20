const router=require("express").Router();
const User=require("../models/User");
const bcrypt=require ("bcrypt");

//REGISTER
router.post("/register",async(req,res)=>{
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPass=await bcrypt.hash(req.body.password,salt);
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass
        });
        const user=await newUser.save();
        const{password,...others}=user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        
        if (!user) {
            return res.status(400).json("Wrong credentials1");
        }

        const validate = await bcrypt.compare(req.body.password, user.password);
        
        if (!validate) {
            return res.status(400).json("Wrong credentials2");
        }

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports=router;