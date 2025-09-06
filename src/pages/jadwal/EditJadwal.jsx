import {useEffect, useState} from "react";
import axios from "axios";
import {errorAlert, successAlert} from "../../utils/Swall";

function EditJadwal({jadwalId, onClose, onUpdated}) {
  const [jadwal, setJadwal] = useState({
    hari: "",
    mata_kuliah: "",
    dosen: "",
    jam: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJadwal = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/jadwal/${jadwalId}`,
          {headers: {Authorization: `Bearer ${token}`}}
        );
        setJadwal(res.data);
      } catch (err) {
        console.error(err);
        errorAlert("Gagal mengambil data jadwal");
      } finally {
        setLoading(false);
      }
    };
    fetchJadwal();
  }, [jadwalId]);

  const handleChange = (e) =>
    setJadwal({...jadwal, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.REACT_APP_API_URL}api/jadwal/${jadwalId}`,
        jadwal,
        {
          headers: {Authorization: `Bearer ${token}`},
        }
      );
      successAlert("Jadwal berhasil diperbarui");
      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      errorAlert("Gagal memperbarui jadwal");
    }
  };

  if (loading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Jadwal Kuliah
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              name="hari"
              value={jadwal.hari}
              onChange={handleChange}
              required
              className="peer h-12 w-full border-b-2 border-gray-300 focus:border-blue-500 text-gray-800 placeholder-transparent outline-none"
              placeholder="Hari"
            />
            <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
              Hari
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              name="mata_kuliah"
              value={jadwal.mata_kuliah}
              onChange={handleChange}
              required
              className="peer h-12 w-full border-b-2 border-gray-300 focus:border-blue-500 text-gray-800 placeholder-transparent outline-none"
              placeholder="Mata Kuliah"
            />
            <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
              Mata Kuliah
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              name="dosen"
              value={jadwal.dosen}
              onChange={handleChange}
              required
              className="peer h-12 w-full border-b-2 border-gray-300 focus:border-blue-500 text-gray-800 placeholder-transparent outline-none"
              placeholder="Dosen"
            />
            <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
              Dosen
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              name="jam"
              value={jadwal.jam}
              onChange={handleChange}
              required
              className="peer h-12 w-full border-b-2 border-gray-300 focus:border-blue-500 text-gray-800 placeholder-transparent outline-none"
              placeholder="Jam"
            />
            <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
              Jam
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditJadwal;
