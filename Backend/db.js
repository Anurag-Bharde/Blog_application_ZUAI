const mongoose =require("mongoose");


mongoose.connect("mongodb+srv://anuragadmin:KIkBqYjyBQZXxJ33@cluster0.3sk1xst.mongodb.net/Blog_ZuAi")

const BlogPost=new mongoose.Schema({
    Title:{
        type:String,
        required:true,
        minLength:3,
        trim:true
    },
    Post:{
       type:String,
        required:true,
        minLength:3,
        trim:true
    },
    TimePost:Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserInfo', // Ensure this matches the model name exactly
        required: true
    }
})

const UserInfo=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,  
    },
    profession:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30,
        trim:true
    }
})

const CommentSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true,
      trim: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserInfo',
      required: true
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BlogPostInfo',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

const BlogPostSchema=mongoose.model('BlogPostInfo',BlogPost)
const UserSchema=mongoose.model('UserInfo',UserInfo)
const CommentModel = mongoose.model('Comment', CommentSchema);


module.exports={
    BlogPostSchema,
    UserSchema,
    CommentModel
}