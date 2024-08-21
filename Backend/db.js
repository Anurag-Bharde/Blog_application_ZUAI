const mongoose =require("mongoose");


mongoose.connect("mongodb+srv://anuragadmin:KIkBqYjyBQZXxJ33@cluster0.3sk1xst.mongodb.net/Blog_ZuAi")

const BlogPost=new mongoose.Schema({
    Title:String,
    Post:String,
    TimePost:Date
})

const BlogPostSchema=mongoose.model('BlogPostInfo',BlogPost)

module.export={
    BlogPostSchema
}