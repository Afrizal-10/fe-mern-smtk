import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

export default function BlogDetail() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token"); // ambil token
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}api/blogs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // kirim token
            },
          }
        );
        setBlog(res.data);
      } catch (error) {
        console.error(
          "Error fetching blog detail:",
          error.response?.data || error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <p className="p-4 text-center">Loading blog...</p>
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <p className="p-4 text-red-500 text-center">Blog tidak ditemukan</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 px-4 py-2 rounded mb-4 hover:bg-gray-300 transition"
        >
          ← Kembali
        </button>

        {blog.imageUrl && (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-500 text-sm mb-6">
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        <p className="text-lg leading-relaxed whitespace-pre-line">
          {blog.description}
        </p>
      </div>
    </div>
  );
}
