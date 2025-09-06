import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

const BlogListCard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}api/blogs`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading blogs...</p>;

  if (blogs.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">
        Belum ada blog tersedia.
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4 flex justify-start mt-6">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-semibold transition-colors duration-200"
        >
          ← Home
        </button>
      </div>
      <h2 className="max-w-6xl mx-auto text-3xl sm:text-4xl font-bold text-gray-800 mt-4 px-4">
        Blog Terbaru
      </h2>
      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300"
            onClick={() => navigate(`/blogs/${blog._id}`)}
          >
            {blog.imageUrl && (
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-green-800 mb-3 line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {blog.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogListCard;
