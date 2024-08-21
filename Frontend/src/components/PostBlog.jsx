import { useState } from "react"
import axios from "axios";


export function PostBlog(post,setPost){

    const [title,setTitle]=useState("")
    const [blog,setBlog]=useState("");


   async function addBlog(){
     try{const response=await axios.post("http://localhost:3000/posts",{
        Title:title,
        Post:blog
     },{
        headers:{
            "Content-Type":"application/json"
        }
     })
     setPost([response.data, ...post])
     setBlog("");
     setTitle("");
     }
     catch(error){
        console.log(error);

     }
    }


    return (
        <div>
            <input type="text" placeholder="Enter Title to your Blog" value={title}
            onChange={(e)=>{
                setTitle(e.target.value)
            }}></input>
           <input type="text" placeholder="Enter your Blog" value={blog}
            onChange={(e)=>{
                setBlog(e.target.value)
            }}></input>
           
           <button onClick={addBlog}>Submit</button>

        </div>
    )
}