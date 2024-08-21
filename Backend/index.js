const express= require('express');
const app=express();
const BlogPostSchema=require("./db")

app.get('/posts',async(req,res)=>{
    try{
        const notes=await BlogPostSchema.find().sort({TimePost: -1});
    }
    catch(err){

    }
})



app.get('/posts/:id',(req,res)=>{

})


app.post('/posts',(req,res)=>{

})



app.put('/posts/:id',(req,res)=>{

})


app.delete('/posts/:id',(req,res)=>{

})