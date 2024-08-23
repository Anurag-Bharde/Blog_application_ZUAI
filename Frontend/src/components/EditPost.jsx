import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"
import Modal from "./Modal";

export default function EditPost({fetchPosts}){
    const {id}=useParams();
    const [title,setTitle]=useState("")
    const [blog,setBlog]=useState("")
    // const [title,setTitle]=useState("")

    const [showModal,setShowModal]=useState(false);

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
        await fetchPosts()
        navigate('/BlogList')

    }catch(error){
        console.error(error)
    }
       }

       function handleEditClick(){
          setShowModal(true)
       }

    return(
        <>
        <div>
        <input type="text" value={title} placeholder="Title" onChange={(e)=>setTitle(e.target.value)}></input>
        <textarea type="text" value={blog} placeholder="Blog content" onChange={(e)=>setBlog(e.target.value)}></textarea>
        <button onClick={handleEditClick}>Edit The Post</button>
        </div>
        {showModal && (
            <Modal
            OnClose={()=> setShowModal(false)}
            OnConfirm={()=> editPosted()}
            >
                <h2>Edit the Blog</h2>
                <h6>The deleted blog will not be shown again</h6>
            </Modal>
        )}
        </>
    )
}