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
     await axios.post("http://localhost:3000/logout")
     navigate("/Signin")
  }

  return (
    <>
    <div>
    <button className="" onClick={()=> LogoutFunc()}>Logout</button>
    </div>
    <div className="flex justify-center">
    <button className="border-4 pt-5 pl-20 pr-20 pb-5 border-indigo-500 rounded-full " onClick={()=>navigate("/PostBlog")}>
    Post a Blog</button>
</div>
 <div className="grid max-w-2xl grid-cols-1 pl-20 gap-x-8 gap-y-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
    {post.map((list) => (
    <div className="flex max-w-xl flex-col items-start justify-between p-2 border border-gray-700 rounded-lg" key={list._id}>
       <div className="grid">
        <p className="text-gray-500">{formatDistance(new Date(), new Date(list.TimePost))} ago</p>
        <div>
        <button className="border-2" onClick={() => navigate(`/edit/${list._id}`)}>Edit this Blog</button>
        <button className="border-2" onClick={() => handleDeleteClick(list._id)}>Delete</button>
      </div>
       </div>
        <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  
                    <span className="absolute inset-0" />
                    {list.Title}
    
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{list.Post}</p>
              </div>
       
       
              <div className="relative mt-8 flex items-center gap-x-4">
               
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    
                      <span className="absolute inset-0" />
                      {list.user.firstName} {list.user.lastName}
                  
                  </p>
                  <p className="text-gray-600">{list.user.profession}</p>
                </div>
              </div>



        {/* {list.user && (
            <div>
                <p>Author: {list.user.firstName} {list.user.lastName}</p>
                <p>Profession: {list.user.profession}</p>
            </div>
        )} */}
       </div>
))}
</div>

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