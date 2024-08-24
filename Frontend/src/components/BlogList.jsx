import React, { useState, useEffect } from "react";
import { formatDistance } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import image from './image.png';
import a from './image/1.png';
import b from './image/2.png';
import c from './image/3.png';
import d from './image/4.png';
import BlogModal from "./BlogModal";
import { valuer } from "../Store/Atom";
import { useRecoilValue } from "recoil";

export function BlogList({ post, fetchPosts }) {
  const [showModal, setShowModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [postToDelete, setPostToDelete] = useState(null);
  const [username, setUsername] = useState(""); // State to hold the username
  const navigate = useNavigate();

  // Get the username from Recoil state when the component mounts or the post changes
  const usered = useRecoilValue(valuer);

  useEffect(() => {
    setUsername(usered);
  }, [usered, post]);

  // Other functions...
  async function deleter(id) {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);
      await fetchPosts();
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  function handleDeleteClick(id) {
    setPostToDelete(id);
    setShowModal(true);
  }

  async function LogoutFunc() {
    await axios.post("http://localhost:3000/logout");
    navigate("/Signin");
  }

  function handleBlogClick(index) {
    setCurrentPostIndex(index);
    setShowBlogModal(true);
  }

  function handlePrevBlog() {
    setCurrentPostIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : post.length - 1
    );
  }

  function handleNextBlog() {
    setCurrentPostIndex((prevIndex) =>
      prevIndex < post.length - 1 ? prevIndex + 1 : 0
    );
  }

  return (
    <div className="bg-[#e5ecf3] min-h-screen flex">
      {/* Side Navigation Bar */}
      <div className="bg-white dark:bg-gray-800 w-16 flex flex-col justify-between items-center py-4 border-r border-gray-300 dark:border-gray-700 sticky top-0 h-screen">
        {/* Logo at the top */}
        <div className="flex flex-col items-center">
          <img src="image.png" alt="dev" className="w-10 h-10 mb-6" />
        </div>

        {/* Icon buttons at the bottom */}
        <div className="flex flex-col items-center gap-6 mb-6">
          <button className="p-2 bg-slate-50 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
            <img src={a} alt="Icon 1" className=" w-6 h-6" />
          </button>
          <button className="p-2 bg-slate-50 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
            <img src={b} alt="Icon 2" className="w-6 h-6" />
          </button>
          <button className="p-2 bg-slate-50 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
            <img src={c} alt="Icon 3" className="w-6 h-6" />
          </button>
          <button className="p-2 bg-slate-50 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
            <img src={d} alt="Icon 4" className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Navigation Bar */}
        <nav className="bg-gray-100 p-4 border-2 rounded-full mb-2 transition-all duration-200 ease-out hover:shadow-[0_0_6px_#23adff]">
          <div className="container mx-auto flex justify-between items-center">
            <a href="https://www.zuai.co/" target="_blank">
              <img src={image} className="h-9" />
            </a>
            <h4>Hello {username}</h4>
            <button
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => LogoutFunc()}
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Post a Blog Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => navigate("/PostBlog")}
            className="border-3 animate-badge-color-cycle px-16 py-4 rounded-full text-black font-serif text-xl font-medium hover:underline decoration-black-900 shadow-xl"
          >
            Post a Blog
          </button>
        </div>

        {/* Blog Cards */}
        <div className="grid max-w-2xl grid-cols-1 gap-x-5 gap-y-8 sm:mt-4 lg:mx-0 pl-12 lg:max-w-none lg:grid-cols-2">
          {post.map((list, index) => (
            <div
              className="flex max-w-xl flex-col items-start justify-between p-4 border border-gray-300 rounded-lg hover:scale-[1.02] hover:shadow-[0_10px_10px_rgba(0,0,0,.7)] transition-transform transition-shadow duration-500 ease-in-out"
              key={list._id}
            >
              <div className="grid grid-cols-4 w-full">
                <p className="text-gray-500 col-start-1 col-end-2">
                  {formatDistance(new Date(), new Date(list.TimePost))} ago
                </p>
                <div className="flex justify-end col-start-4 space-x-2">
                  <button
                    className="border-2 border-slate-300 px-2 py-1 rounded-md hover:bg-gray-300"
                    onClick={() => navigate(`/edit/${list._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="border-2 border-slate-300 px-2 py-1 rounded-md hover:bg-gray-300"
                    onClick={() => handleDeleteClick(list._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <article>
                <button
                  className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 hover:text-slate-600 hover:underline"
                  onClick={() => handleBlogClick(index)}
                >
                  {list.Title}
                </button>
                <button
                  className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 hover:underline"
                  onClick={() => handleBlogClick(index)}
                >
                  {list.Post}
                </button>
              </article>

              <div className="relative mt-8 flex items-center gap-x-4">
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    {list.user.firstName} {list.user.lastName}
                  </p>
                  <p className="text-gray-600">{list.user.profession}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
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

      {showBlogModal && (
        <BlogModal
          post={post[currentPostIndex]}
          onClose={() => setShowBlogModal(false)}
          onPrev={handlePrevBlog}
          onNext={handleNextBlog}
        />
      )}
    </div>
  );
}
