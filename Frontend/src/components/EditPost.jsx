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
            <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Edit your Blog</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Blog Title
          </label>

        <input type="text" value={title} placeholder="Enter Title of Your Blog" onChange={(e)=>setTitle(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md"
 ></input>
  </div>
  <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="blog">
            Blog Content
          </label>
        <textarea type="text" value={blog} placeholder="Enter the content of your blog" onChange={(e)=>setBlog(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md h-60 resize-none"
></textarea>
</div>
        <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 transition-colors"
 onClick={handleEditClick}>Edit The Post</button>
        </div>
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