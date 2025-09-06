import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {errorAlert, successAlert} from "../../utils/Swall";
import {Mail, Lock} from "lucide-react"; // icon input

export default function Login() {
  const [form, setForm] = useState({email: "", password: ""});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}api/auth/login`,
        form
      );
      const {token} = res.data;

      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      localStorage.setItem("user", JSON.stringify(decoded));

      successAlert("Login berhasil!");
      navigate("/");
    } catch (err) {
      errorAlert(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-400 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Selamat Datang 👋
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Masuk untuk melanjutkan ke{" "}
            <span className="text-blue-600 font-semibold">KuliahApp</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={handleChange}
              value={form.email}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={handleChange}
              value={form.password}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
