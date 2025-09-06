import {useEffect, useState} from "react";
import axios from "axios";
import BlogCard from "./BlogCard"; // pastikan ini satu folder dengan BlogListPage.jsx
import Navbar from "../../components/Navbar";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (deletedId) => {
    setBlogs((prev) => prev.filter((blog) => blog._id !== deletedId));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <p className="p-4">Loading blogs...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Daftar Blog</h1>
        {blogs.length === 0 ? (
          <p className="text-gray-600">Belum ada blog yang dibuat.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
