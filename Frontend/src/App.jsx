import { useEffect, useState,lazy, Suspense } from 'react'
import './App.css'
const PostBlog= lazy(()=> import("./components/PostBlog"))
import axios from 'axios'
import { BlogList } from './components/BlogList'
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import EditPost from './components/EditPost'


function App() {
const [post,setPost]=useState([])
const [showForm, setShowForm] = useState(false)


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
},[showForm])





  return (
    <>
    
    <BrowserRouter>
    <AppBar post={post} setPost={setPost} setShowForm={setShowForm} />
    </BrowserRouter>
      
    </>
  )
}

function AppBar({post,setPost,setShowForm}){
const navigate=useNavigate();
const location=useLocation();
  return (
    <>
    {location.pathname !=='/PostBlog' && location.pathname !=='/edit/'  && (
      <button onClick={()=>{
      navigate("/PostBlog");
     }}>Post a Blog</button>
    )}
    <Routes>
        <Route path="/PostBlog" element={<Suspense fallback={"loading..."}><PostBlog post={post} setPost={setPost} /></Suspense>} />
        <Route path='/' element={<BlogList post={post} />} />
        <Route path='/edit/:id' element={<EditPost post={post} setShowForm={setShowForm}/>} />
      </Routes>
    </>
  )
}

export default App
