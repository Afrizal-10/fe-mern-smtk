import {useState} from "react";
import axios from "axios";
import {errorAlert, successAlert} from "../../utils/Swall";

const CreateBlog = ({onSuccess}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const {name, value, files} = e.target;
    if (name === "imageUrl") {
      setFormData((prev) => ({...prev, imageUrl: files[0] || null}));
    } else {
      setFormData((prev) => ({...prev, [name]: value}));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.imageUrl) throw new Error("File gambar wajib di-upload!");

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("imageUrl", formData.imageUrl);

      const token = localStorage.getItem("token"); // ambil token

      await axios.post(`${import.meta.env.VITE_API_URL}api/blogs`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // tambahkan token
        },
      });

      setFormData({title: "", description: "", imageUrl: null});
      if (onSuccess) onSuccess();
      successAlert("Blog berhasil dibuat!");
    } catch (error) {
      console.error(error.response?.data || error);
      errorAlert(error.response?.data?.message || "Gagal menambahkan blog!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Buat Blog Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Judul Blog
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Masukkan judul blog"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Deskripsi
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tulis deskripsi blog..."
            rows="4"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Foto Blog
          </label>
          <input
            type="file"
            name="imageUrl"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 
                       file:rounded-lg file:border-0 file:text-sm file:font-semibold 
                       file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          {loading ? "Menyimpan..." : "Simpan Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
