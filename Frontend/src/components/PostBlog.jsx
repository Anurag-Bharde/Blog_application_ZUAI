import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PostBlog({ setPost, post, fetchPosts }) {
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");

  const navigate = useNavigate();

  async function addBlog() {
    try {
      await axios.post("http://localhost:3000/posts", {
        Title: title,
        Post: blog
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      // Refetch the posts
      await fetchPosts();

      setBlog("");
      setTitle("");
      navigate('/BlogList');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    
    <div className="max-w-3xl mx-auto p-6 bg-white  rounded-lg shadow-lg">
  <h1 className="text-3xl font-bold mb-4">Create a New Blog Post</h1>
  
  <input
    type="text"
    placeholder="Enter Title of Your Blog"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  
  <textarea
    placeholder="Enter the content of your blog"
    value={blog}
    onChange={(e) => setBlog(e.target.value)}
    rows="10"
    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
  ></textarea>
  
  <button
    onClick={addBlog}
    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
  >
    Submit
  </button>
</div>

  );
}
