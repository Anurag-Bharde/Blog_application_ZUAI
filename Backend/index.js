const express= require('express');
const app=express();
const {BlogPostSchema}=require("./db")

app.use(express.json())

app.get('/posts',async(req,res)=>{
    try{
        const blogs=await BlogPostSchema.find().sort({TimePost: -1});
        res.status(200).json(blogs);
    }
    catch(err){
      console.log(err);
      res.status(500).json({msg:"Internal Server Error while getting the Blogs"})
    }
})



app.get('/posts/:id',async(req,res)=>{
try{const id=req.params.id;
const post=await BlogPostSchema.findById(id);
res.json(post)}
catch(err){
    console.log(err);
    res.status(500).json({msg:"Server Error :/getById"})

}
})


app.post('/posts',async(req,res)=>{
try{
const {Title,Post}=req.body;

if(!Title && Title===undefined  && Post===undefined && !Post){
    return res.status(400).json({msg:"Post entered is not valid"})
}

const timer=new Date();
const posting=await BlogPostSchema.create({
    Title:Title,
    Post:Post,
    TimePost:timer
})
res.status(201).json(posting)
}
catch(error){
console.log(error);
res.status(500).json({msg:"Internal Server Error while posting the Blog"})
}
})



app.put('/posts/:id',async(req,res)=>{
 try{
    const id=req.params.id;
    if(!id || id == "undefined"){
        return res.status(400).json({msg:"The id is invalid"})
    }
    const post=await BlogPostSchema.findById(id);
    if(!post){
        return res.status(400).json({msg:"The Blog was not found"})
    }
    post.Title=req.body.Title,
    post.Post=req.body.Post
    await post.save();
    res.status(200).json({msg:"The Blog was updated"})
 }
 catch(err){

console.log(err);
res.status(500).json({msg:"Internal Server Error while updating the Blog"})
 }
})


app.delete('/posts/:id',async(req,res)=>{
try{
    const id=req.params.id;
    if(!id || id == "undefined"){
        return res.status(400).json({msg:"The id is invalid"})
    }
    const post=await BlogPostSchema.findById(id);
    if(!post){
        return res.status(400).json({msg:"The Blog was not found"})
    }
    await BlogPostSchema.deleteOne({_id:id})
    
    res.status(200).json({msg:"The Blog was deleted"})
 }
 catch(err){

console.log(err);
res.status(500).json({msg:"Internal Server Error while deleting the Blog"})
 }

})

app.listen(3000,()=>{
    console.log(`The Sereve is started on http://localhost:3000`)
})