import { useEffect, useState } from 'react'
import './App.css'
import { PostBlog } from './components/PostBlog'
import axios from 'axios'
import { BlogList } from './components/BlogList'

function App() {
const [post,setPost]=useState([])


useEffect(()=>{
  async function fetchMyApi(){
      try{
const response=await axios.get("http://localhost:3000/posts")
console.log(response.data)
setPost(response.data)
  }
  catch(error){
    console.error(error)
  }
  }
  fetchMyApi()
},[])

  return (
    <>
      <div>
      <PostBlog setPost={setPost} post={post} />
      <BlogList post={post} />
       </div>
    </>
  )
}

export default App
