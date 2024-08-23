import { formatDistance } from "date-fns"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Modal from "./Modal"
import { useState } from "react"

export function BlogList({ post, fetchPosts }) {
  const [showModal, setShowModal] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)
  const navigate = useNavigate()

  async function deleter(id) {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`)
      await fetchPosts()
      setShowModal(false)
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  function handleDeleteClick(id) {
    setPostToDelete(id)
    setShowModal(true)
  }

  async function LogoutFunc(){
     await axios.post("http://localhost:3001/logout")
     navigate("/Signin")
  }

  return (
    <>
    <button className="border-4 border-black-700 m-5" onClick={()=>navigate("/PostBlog")}>
    Post a Blog</button>
    <button onClick={()=> LogoutFunc()}>Logout</button>

      {post.map((list) => (
        <div className="border-2 border-black m-3" key={list._id}>
          <h4 className="ml-4 mt-1">{list.Title}</h4>
          <h5 className="ml-4 mt-1">{list.Post}</h5>
          <p>{formatDistance(new Date(), new Date(list.TimePost))} ago</p>
          <button className="border-2" onClick={() => navigate(`/edit/${list._id}`)}>Edit this Blog</button>
          <button className="border-2" onClick={() => handleDeleteClick(list._id)}>Delete</button>
        </div>
      ))}

      {showModal && (
        <Modal 
          OnClose={() => setShowModal(false)}
          OnConfirm={() => deleter(postToDelete)}
        >
          <h2>Delete the Blog</h2>
          <h6>The deleted blog will not be shown again</h6>
        </Modal>
      )}
    </>
  )
}