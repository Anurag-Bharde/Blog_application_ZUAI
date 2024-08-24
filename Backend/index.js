const express= require('express');
const cors=require("cors")
const app=express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const { UserSchema } = require("./db");
const {BlogPostSchema}=require("./db");


const JWT_SECRET = "test123";
app.use(cookieParser());
app.use(express.json())

app.use(
    cors({
      credentials: true,
      origin: "http://localhost:5173",
    })
  );


  app.post("/signin",async (req, res) => {
    const { username, password } = req.body;
    const USeRFINDER=await UserSchema.findOne({username:username,password:password})
    if(!USeRFINDER){
        return res.status(411).json({msg:"Enter the credentials correctly"})
     }
     const iddd=USeRFINDER._id;

    const token = jwt.sign({ id:iddd }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true, secure: true });
    return res.send("Logged in!" + token);
  });
  
  app.post("/signup",async(req,res)=>{
    const {username,password,firstName,lastName,profession}=req.body;
    const USeRFINDER=await UserSchema.findOne({username:username})
   if(USeRFINDER){
       return res.status(411).json({msg:"User Already Exists"})
    }
    try{ 
        const dbUser=await UserSchema.create({
            username:username,
            password:password,
            firstName:firstName,
            lastName:lastName,
            profession:profession
        })
      const userIDd=dbUser._id.toString()
        const token = jwt.sign({id:userIDd}, JWT_SECRET, { expiresIn: 60*60 });
        res.cookie("token", token, { httpOnly: true, secure: true });
    }
    catch(error){
        if (error.name === 'ValidationError') {
            const field = Object.keys(error.errors)[0];
            const message = error.errors[field].message;
            return res.status(402).json({message})
        }  
        
        return res.status(500).json({msg:"error occured"})        
    }
    return res.status(200).json({msg:"The user data is saved"})
})

app.get("/user", (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      // Fetch user email or other details from the database using decoded.id
      res.json({ userId: decoded.id });
  
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  });
  
  app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out!" });
  });

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "index.html"));
  });
  














app.get('/posts',async(req,res)=>{
    try{
        const blogs = await BlogPostSchema.find()
            .sort({ TimePost: -1 })
            .populate('user', 'username firstName lastName profession');
        res.status(200).json(blogs);
    }
    catch(err){
      console.log(err);
      res.status(500).json({msg:"Internal Server Error while getting the Blogs"})
    }
})




const authenticateToken = (req, res, next) => {
    const token = req.cookies ? req.cookies.token : null;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id // Extract userId from the decoded token
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};


app.get('/posts/:id',async(req,res)=>{
try{const id=req.params.id;
const post=await BlogPostSchema.findById(id);
res.json(post)}
catch(err){
    console.log("bb")
    console.log(err);
    res.status(500).json({msg:"Server Error :/getById"})

}
})


app.post('/posts', authenticateToken, async (req, res) => {

    try {
        const { Title, Post } = req.body;
        const userId = req.userId; // Ensure userId is set

        if (!Title || !Post || !userId) {
            return res.status(400).json({ msg: "Post data or user ID is missing" });
        }

        const timer = new Date();
        const posting = await BlogPostSchema.create({
            Title,
            Post,
            TimePost: timer,
            user: userId // Include the user field
        });

        res.status(201).json(posting);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error while posting the Blog" });
    }
});




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