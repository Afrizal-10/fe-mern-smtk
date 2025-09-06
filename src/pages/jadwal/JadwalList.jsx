import {useEffect, useState} from "react";
import axios from "axios";
import {Pencil, Trash2, Calendar, ArrowLeft} from "lucide-react";
import {useNavigate} from "react-router-dom";
import EditJadwal from "./EditJadwal";
import Navbar from "../../components/Navbar";
import {errorAlert, successAlert} from "../../utils/Swall";

const JadwalList = () => {
  const navigate = useNavigate();
  const [jadwals, setJadwals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchJadwals = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}api/jadwal`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      setJadwals(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Gagal mengambil data jadwal.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJadwals();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus jadwal ini?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}api/jadwal/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      setJadwals(jadwals.filter((j) => j._id !== id));
      successAlert("Jadwal berhasil dihapus");
    } catch (err) {
      console.error(err);
      errorAlert("Gagal menghapus jadwal");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <button
          onClick={() => navigate("/home")}
          className="mb-4 inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" /> Kembali
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <Calendar className="w-7 h-7 text-blue-500" />
          Daftar Jadwal Kuliah
        </h2>

        {loading && (
          <p className="text-center py-10 text-gray-500">Loading jadwal...</p>
        )}
        {error && (
          <p className="text-center py-10 text-red-600 font-medium">{error}</p>
        )}

        {!loading && !error && (
          <>
            {jadwals.length === 0 ? (
              <p className="text-gray-600">Belum ada jadwal ditambahkan.</p>
            ) : (
              <>
                <div className="sm:hidden space-y-4">
                  {jadwals.map((j) => (
                    <div
                      key={j._id}
                      className="bg-white p-4 rounded-xl shadow flex flex-col gap-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800">
                          {j.hari}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingId(j._id)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(j._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <p>
                        <span className="font-medium">Mata Kuliah: </span>
                        {j.mata_kuliah}
                      </p>
                      <p>
                        <span className="font-medium">Dosen: </span>
                        {j.dosen}
                      </p>
                      <p>
                        <span className="font-medium">Jam: </span>
                        {j.jam.replace(/^Pukul\s*/, "")}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Table desktop */}
                <div className="hidden sm:block overflow-x-auto shadow-lg rounded-xl">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#113F67]">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Hari
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Mata Kuliah
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Dosen
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                          Jam
                        </th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-white">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {jadwals.map((j, idx) => (
                        <tr
                          key={j._id}
                          className={
                            idx % 2 === 0
                              ? "bg-gray-50 hover:bg-gray-100 transition"
                              : "hover:bg-gray-100 transition"
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                            {j.hari}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                            {j.mata_kuliah}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                            {j.dosen}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                            {j.jam.replace(/^Pukul\s*/, "")}
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            <div className="flex justify-center gap-4">
                              <button
                                onClick={() => setEditingId(j._id)}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <Pencil className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(j._id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        )}

        {/* Modal Edit */}
        {editingId && (
          <EditJadwal
            jadwalId={editingId}
            onClose={() => setEditingId(null)}
            onUpdated={fetchJadwals}
          />
        )}
      </div>
    </div>
  );
};

export default JadwalList;
