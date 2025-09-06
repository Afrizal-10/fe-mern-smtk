import {useEffect, useState} from "react";
import axios from "axios";
import {FaCheck, FaTrash, FaEdit} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function DaftarTugas() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCourse, setEditCourse] = useState("");
  const [editDeadline, setEditDeadline] = useState("");
  const [editPhotoUrl, setEditPhotoUrl] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}api/tasks`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Gagal mengambil tugas:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus tugas ini?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}api/tasks/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      fetchTasks();
    } catch (error) {
      console.error("Gagal menghapus tugas:", error);
    }
  };

  const handleComplete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}api/tasks/${id}`,
        {status: "selesai"},
        {
          headers: {Authorization: `Bearer ${token}`},
        }
      );
      fetchTasks();
    } catch (error) {
      console.error("Gagal mengubah status:", error);
    }
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditCourse(task.course || "");
    setEditDeadline(task.deadline ? task.deadline.split("T")[0] : "");
    setEditPhotoUrl(task.photoUrl || "");
  };

  const cancelEdit = () => {
    setEditingTask(null);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}api/tasks/${editingTask._id}`,
        {
          title: editTitle,
          description: editDescription,
          course: editCourse,
          deadline: editDeadline,
          photoUrl: editPhotoUrl,
          status: editingTask.status,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        }
      );
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error("Gagal update tugas:", error);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "selesai":
        return (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
            Selesai
          </span>
        );
      case "pending":
        return (
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
            Pending
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
            Belum Selesai
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-semibold"
        >
          &#8592; Kembali
        </button>

        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
          Daftar Tugas
        </h1>
        <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-[#113F67] text-white">
                <th className="py-3 px-5 text-left font-semibold uppercase text-sm">
                  Judul
                </th>
                <th className="py-3 px-5 text-left font-semibold uppercase text-sm">
                  Deskripsi
                </th>
                <th className="py-3 px-5 text-left font-semibold uppercase text-sm">
                  Mata Kuliah
                </th>
                <th className="py-3 px-5 text-left font-semibold uppercase text-sm">
                  Deadline
                </th>
                <th className="py-3 px-5 text-left font-semibold uppercase text-sm">
                  Foto
                </th>
                <th className="py-3 px-5 text-center font-semibold uppercase text-sm">
                  Status
                </th>
                <th className="py-3 px-5 text-center font-semibold uppercase text-sm">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task, idx) => (
                  <tr
                    key={task._id}
                    className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-3 px-5 align-top">{task.title}</td>
                    <td
                      className="py-3 px-5 align-top max-w-xs truncate"
                      title={task.description}
                    >
                      {task.description || "-"}
                    </td>
                    <td className="py-3 px-5 align-top">
                      {task.course || "-"}
                    </td>
                    <td className="py-3 px-5 align-top whitespace-nowrap">
                      {task.deadline
                        ? new Date(task.deadline).toLocaleDateString("id-ID")
                        : "-"}
                    </td>
                    <td className="py-3 px-5 align-top">
                      {task.photoUrl ? (
                        <img
                          src={task.photoUrl}
                          alt={task.title}
                          className="w-16 h-16 rounded-md object-cover shadow-sm border border-gray-200"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-3 px-5 text-center align-top">
                      {getStatusBadge(task.status)}
                    </td>
                    <td className="py-3 px-5 text-center align-top flex justify-center gap-3">
                      <button
                        onClick={() => handleComplete(task._id)}
                        className={`p-2 rounded-md text-white transition-colors duration-200 ${
                          task.status === "selesai"
                            ? "bg-green-300 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                        title="Tandai Selesai"
                        disabled={task.status === "selesai"}
                      >
                        <FaCheck size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="p-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
                        title="Hapus"
                      >
                        <FaTrash size={16} />
                      </button>
                      <button
                        onClick={() => startEdit(task)}
                        className="p-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white transition-colors duration-200"
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    Tidak ada tugas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="md:hidden space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-lg shadow-md p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                {task.photoUrl ? (
                  <img
                    src={task.photoUrl}
                    alt={task.title}
                    className="w-full sm:w-24 h-24 rounded-md object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-full sm:w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-sm flex-shrink-0">
                    No Image
                  </div>
                )}
                <div className="flex-1 flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {task.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3">
                    {task.description || "-"}
                  </p>
                  <p>
                    <span className="font-semibold">Mata Kuliah: </span>
                    {task.course || "-"}
                  </p>
                  <p>
                    <span className="font-semibold">Deadline: </span>
                    {task.deadline
                      ? new Date(task.deadline).toLocaleDateString("id-ID")
                      : "-"}
                  </p>
                  <div>{getStatusBadge(task.status)}</div>
                </div>
                <div className="flex gap-3 mt-3 sm:mt-0 sm:flex-col sm:justify-center">
                  <button
                    onClick={() => handleComplete(task._id)}
                    className={`p-2 rounded-md text-white transition-colors duration-200 ${
                      task.status === "selesai"
                        ? "bg-green-300 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                    title="Tandai Selesai"
                    disabled={task.status === "selesai"}
                  >
                    <FaCheck size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="p-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
                    title="Hapus"
                  >
                    <FaTrash size={16} />
                  </button>
                  <button
                    onClick={() => startEdit(task)}
                    className="p-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white transition-colors duration-200"
                    title="Edit"
                  >
                    <FaEdit size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 font-medium">
              Tidak ada tugas
            </p>
          )}
        </div>
        {editingTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Edit Tugas
              </h2>
              <label className="block mb-4">
                <span className="text-gray-700 font-semibold mb-1 block">
                  Judul:
                </span>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>
              <label className="block mb-4">
                <span className="text-gray-700 font-semibold mb-1 block">
                  Deskripsi:
                </span>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  rows={4}
                />
              </label>
              <label className="block mb-4">
                <span className="text-gray-700 font-semibold mb-1 block">
                  Mata Kuliah:
                </span>
                <input
                  type="text"
                  value={editCourse}
                  onChange={(e) => setEditCourse(e.target.value)}
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>
              <label className="block mb-4">
                <span className="text-gray-700 font-semibold mb-1 block">
                  Deadline:
                </span>
                <input
                  type="date"
                  value={editDeadline}
                  onChange={(e) => setEditDeadline(e.target.value)}
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>
              <label className="block mb-4">
                <span className="text-gray-700 font-semibold mb-1 block">
                  Status:
                </span>
                <select
                  value={editingTask.status}
                  onChange={(e) =>
                    setEditingTask({...editingTask, status: e.target.value})
                  }
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="belum selesai">Belum Selesai</option>
                  <option value="pending">Pending</option>
                  <option value="selesai">Selesai</option>
                </select>
              </label>
              <label className="block mb-6">
                <span className="text-gray-700 font-semibold mb-1 block">
                  URL Foto:
                </span>
                <input
                  type="text"
                  value={editPhotoUrl}
                  onChange={(e) => setEditPhotoUrl(e.target.value)}
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>
              <div className="flex justify-end gap-4">
                <button
                  onClick={cancelEdit}
                  className="px-6 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition-colors duration-200 font-semibold"
                >
                  Batal
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-6 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 text-white font-semibold"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
