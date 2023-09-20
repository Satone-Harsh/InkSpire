const router=require("express").Router();
const User=require("../models/User");
const Post=require("../models/Post")

//CREATE new post
router.post("/",async(req,res)=>{
        const newPost=new Post(req.body);
        console.log(newPost);
        try{
            const saved=await newPost.save();
            res.status(200).json(saved);
        }catch(err){
            res.status(500).json("err");
        }
});

//UPDATE POST
router.put("/:id", async(req,res)=>{
        try{
            const post = await Post.findById(req.params.id);
            if(post.username===req.body.username){
                try{
                    const updated=await Post.findByIdAndUpdate(req.params.id,{
                        $set:req.body,
                    },
                    {new:true}
                    );
                    res.status(200).json(updated);
                }catch(err){
                    res.status(500).json(err);
                }
            }else{
                res.status(401).json("You can update your post only");
            }            
        }catch(err){
            res.status(500).json(err);
        }
});

//DELETE post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json("Post not found");
        }
        if (post.username === req.body.username) {
            try {
                await post.deleteOne(); // Use remove() or deleteOne() to delete the post
                res.status(200).json("Post deleted");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can delete your post only");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET post
router.get("/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
});

//GET ALL POSTS
router.get("/",async(req,res)=>{
    const username=req.query.user;
    const category=req.query.cat;
    try{
        let posts;
        if(username){
            posts=await Post.find({username:username})
        }else if(category){
            posts=await Post.find({categories:{
                $in:[category]
            }})
        }else{
            posts= await Post.find();
        }
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports=router;