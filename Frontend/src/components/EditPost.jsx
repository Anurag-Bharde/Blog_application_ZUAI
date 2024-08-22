import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"

export default function EditPost({setShowForm}){
    const {id}=useParams();
    const [title,setTitle]=useState("")
    const [blog,setBlog]=useState("")
    // const [title,setTitle]=useState("")

    const navigate=useNavigate();
   
    useEffect(()=>{
     async function fetcher(){
        try{
            const response=await axios.get(`http://localhost:3000/posts/${id}`);
            setTitle(response.data.Title);
            setBlog(response.data.Post)
        }
        catch(error){
            console.error(error)
        }
     }
     fetcher()
    },[id])


           async function editPosted(){
            try{
         const response=await axios.put(`http://localhost:3000/posts/${id}`,{
            Title:title,
            Post:blog
         },{
            headers:{
                "Content-Type":"application/json"
            }
         }
        )
        setShowForm(true);
        navigate('/')
    }catch(error){
        console.error(error)
    }
       }
  
console.log(title , blog)

    return(
        <>
        <input type="text" value={title} placeholder="Title" onChange={(e)=>setTitle(e.target.value)}></input>
        <textarea type="text" value={blog} placeholder="Blog content" onChange={(e)=>setBlog(e.target.value)}></textarea>
        <button onClick={editPosted}>Edit The Post</button>
        </>
    )
}