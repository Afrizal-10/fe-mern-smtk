import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {errorAlert} from "../../utils/Swall";

export default function EditBlog() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setFormData({
          title: res.data.title,
          content: res.data.content,
        });
      } catch (error) {
        console.error("Gagal mengambil blog:", error);
        errorAlert("Blog tidak ditemukan");
        navigate("/blogs");
      }
    };
    fetchBlog();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}api/blogs/${id}`,
        formData
      );
      alert("Blog berhasil diperbarui!");
      navigate("/blogs");
    } catch (error) {
      console.error("Gagal memperbarui blog:", error);
      alert("Terjadi kesalahan saat update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Judul</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border w-full px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Konten</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="6"
            className="border w-full px-3 py-2 rounded"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {loading ? "Menyimpan..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}
