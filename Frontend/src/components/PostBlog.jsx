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
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Submit a Blog Post</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter Title of Your Blog"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="blog">
            Blog Content
          </label>
          <textarea
            id="blog"
            placeholder="Write your blog here..."
            value={blog}
            onChange={(e) => setBlog(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md h-60 resize-none"
          />
        </div>
        <button
          onClick={addBlog}
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 transition-colors"
        >
          Submit
        </button>
      </div>
    </div>

  );
}
