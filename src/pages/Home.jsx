import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {PlusCircle, ListChecks, CheckCircle2, CalendarDays} from "lucide-react";
import axios from "axios";
import Navbar from "../components/Navbar";
import AddTask from "./tasks/AddTask";
import CreateBlog from "./blogs/CreateBlog";
import CreateJadwal from "./jadwal/CreateJadwal";
import Footer from "../components/Footer";
import {errorAlert, successAlert} from "../utils/Swall";

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [activeForm, setActiveForm] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    course: "",
    deadline: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setName(userObj.name || "");
      } catch {
        setName(storedUser);
      }
    }
  }, []);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleFileChange = (e) => {
    setForm({...form, photo: e.target.files[0]});
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoUrl = "";
      if (form.photo) {
        const data = new FormData();
        data.append("image", form.photo);

        const uploadRes = await axios.post(
          `${import.meta.env.VITE_API_URL}api/upload`,
          data,
          {headers: {"Content-Type": "multipart/form-data"}}
        );

        photoUrl = uploadRes.data.url;
      }

      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}api/tasks`,
        {
          title: form.title,
          description: form.description,
          course: form.course,
          deadline: form.deadline,
          photoUrl,
        },
        {headers: {Authorization: `Bearer ${token}`}}
      );

      successAlert("Tugas berhasil ditambahkan!");
      setForm({
        title: "",
        description: "",
        course: "",
        deadline: "",
        photo: null,
      });
      setActiveForm(null);
    } catch (error) {
      const msg = error.response?.data?.message || "Gagal menambahkan tugas";
      errorAlert(msg);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      title: "Tambah",
      desc: "Pilih untuk menambahkan Tugas, Blog, atau Jadwal.",
      icon: <PlusCircle className="w-8 h-8 text-blue-500" />,
      action: () => setActiveForm("choose"),
    },
    {
      title: "Daftar Tugas",
      desc: "Lihat semua tugas yang sedang dikerjakan.",
      icon: <ListChecks className="w-8 h-8 text-green-500" />,
      action: () => navigate("/daftar-tugas"),
    },
    {
      title: "Blog",
      desc: "Lihat blog tentang kuliah.",
      icon: <CheckCircle2 className="w-8 h-8 text-purple-500" />,
      action: () => navigate("/blogs"),
    },
    {
      title: "Jadwal Kuliah",
      desc: "Lihat jadwal kuliah.",
      icon: <CalendarDays className="w-8 h-8 text-blue-500" />,
      action: () => navigate("/jadwals"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 flex flex-col items-center flex-grow gap-8">
        <div className="max-w-xl text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Selamat Datang, <br />
            <span className="text-blue-600">{name || "Mahasiswa"}</span> 👋
          </h2>
          <p className="text-gray-600 mb-8 text-sm sm:text-base">
            Kelola dan pantau semua tugas kuliahmu{" "}
            <br className="hidden sm:block" />
            di sini.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-4xl w-full px-2 sm:px-4">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              onClick={item.action}
              className="bg-white shadow-lg rounded-xl p-5 sm:p-6 hover:shadow-2xl hover:scale-105 transform transition cursor-pointer flex flex-col items-start gap-4 flex-1 max-w-xs min-w-[230px] w-full sm:w-auto"
              style={{minHeight: "180px"}}
            >
              {item.icon}
              <div className="flex flex-col flex-grow overflow-hidden">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-4">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pilihan Form */}
      {activeForm === "choose" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Pilih Form</h2>
            <button
              onClick={() => setActiveForm("addTask")}
              className="block w-full bg-green-500 text-white px-4 py-2 rounded mb-2"
            >
              Isi Tugas
            </button>
            <button
              onClick={() => setActiveForm("addBlog")}
              className="block w-full bg-purple-500 text-white px-4 py-2 rounded mb-2"
            >
              Isi Blog
            </button>
            <button
              onClick={() => setActiveForm("addSchedule")}
              className="block w-full bg-blue-500 text-white px-4 py-2 rounded"
            >
              Isi Jadwal
            </button>
            <button
              onClick={() => setActiveForm(null)}
              className="mt-4 text-gray-500 hover:underline"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Form Tugas */}
      {activeForm === "addTask" && (
        <AddTask
          form={form}
          onChange={handleChange}
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
          onCancel={() => setActiveForm(null)}
          loading={loading}
        />
      )}

      {/* Form Blog */}
      {activeForm === "addBlog" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <CreateBlog />
            <button
              onClick={() => setActiveForm(null)}
              className="mt-4 text-gray-500 hover:underline"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Form Jadwal */}
      {activeForm === "addSchedule" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <CreateJadwal />
            <button
              onClick={() => setActiveForm(null)}
              className="mt-4 text-gray-500 hover:underline"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
