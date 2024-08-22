import { useEffect, useState,lazy, Suspense } from 'react'
import './App.css'
const PostBlog= lazy(()=> import("./components/PostBlog"))
const EditPost= lazy(()=> import("./components/EditPost"))
import axios from 'axios'
import { BlogList } from './components/BlogList'
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from 'react-router-dom'



function App() {
const [post,setPost]=useState([])


useEffect(()=>{
  async function fetchMyApi(){
      try{
const response=await axios.get("http://localhost:3000/posts")
setPost(response.data)

  }
  catch(error){
    console.error(error)
  }
  }
  fetchMyApi()
},[])

const fetchPosts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/posts")
    setPost(response.data)
  } catch (error) {
    console.error(error)
  }
}

useEffect(() => {
  fetchPosts()
}, [])

  return (
    <>
    
    <BrowserRouter>
    <AppBar post={post} setPost={setPost} fetchPosts={fetchPosts} />
    </BrowserRouter>
      
    </>
  )
}

function AppBar({post,setPost,fetchPosts}){
const navigate=useNavigate();
const location=useLocation();
  return (
    <>
    {location.pathname !=='/PostBlog' && location.pathname !=='/edit/'  && (
      <button className="border-4 border-black-700 m-5" onClick={()=>{
      navigate("/PostBlog");
     }}>Post a Blog</button>
    )}
    <Routes>
        <Route path="/PostBlog" element={<Suspense fallback={"loading..."}><PostBlog post={post} setPost={setPost} /></Suspense>} />
        <Route path='/' element={<BlogList post={post} fetchPosts={fetchPosts} />} />
        <Route path='/edit/:id' element={<Suspense fallback={"loading..."}><EditPost post={post} fetchPosts={fetchPosts} /></Suspense>} />
         
      </Routes>
    </>
  )
}

export default App
