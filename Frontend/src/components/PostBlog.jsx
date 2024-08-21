import { useState } from "react"



export function PostBlog(){

    const [title,setTitle]=useState("")
    const [blog,setBlog]=useState("");


   async function addBlog(){
     const response=await 
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