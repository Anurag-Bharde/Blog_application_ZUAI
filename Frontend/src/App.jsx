import { useEffect, useState,lazy, Suspense } from 'react'
import './App.css'
const PostBlog= lazy(()=> import("./components/PostBlog"))
const EditPost= lazy(()=> import("./components/EditPost"))
import axios from 'axios'
import { BlogList } from './components/BlogList'
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import Signin from './components/Signin'
import Home from './components/Home'
import { Signup } from './components/Signup'
import { AuthCheck } from './components/AuthCheck'



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
    <div className='bg-[#e5ecf3]'>
    <>
    <BrowserRouter>
    <AppBar post={post} setPost={setPost} fetchPosts={fetchPosts} />
    </BrowserRouter>
    </>
    </div>
  )
}

function AppBar({post,setPost,fetchPosts}){

  return (
    <>
    <div >
    <Routes>
    <Route path='/' element={<Home />} />
        <Route path='/Signin' element={<Signin />} />
        <Route path='SignUp' element={<Signup/>}/>
        <Route path="/PostBlog" element={<AuthCheck> <Suspense fallback={"loading..."}><PostBlog post={post} setPost={setPost} /></Suspense> </AuthCheck>} />
        <Route path='/BlogList' element={<AuthCheck><BlogList post={post} fetchPosts={fetchPosts} /> </AuthCheck>} />
        <Route path='/edit/:id' element={<AuthCheck><Suspense fallback={"loading..."}><EditPost post={post} fetchPosts={fetchPosts} /></Suspense> </AuthCheck>} />
         
      </Routes>
      </div>
    </>
  )
}

export default App
