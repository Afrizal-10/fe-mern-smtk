import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";

import AddTask from "./pages/tasks/AddTask";
import EditTask from "./pages/tasks/EditTask";
import TaskList from "./pages/tasks/TaskList";

// Blog Pages
import BlogList from "./pages/blogs/BlogList";
import BlogDetail from "./pages/blogs/BlogDetail";
import CreateBlog from "./pages/blogs/CreateBlog";
import EditBlog from "./pages/blogs/EditBlog";

// Jadwal
import CreateJadwal from "./pages/jadwal/CreateJadwal";
import EditJadwal from "./pages/jadwal/EditJadwal";
import JadwalList from "./pages/jadwal/JadwalList";
// Komponen proteksi route
const PrivateRoute = ({children}) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Hanya bisa diakses jika sudah login */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Tasks */}
        <Route
          path="/tambah-tugas"
          element={
            <PrivateRoute>
              <AddTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/daftar-tugas"
          element={
            <PrivateRoute>
              <TaskList />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-tugas/:id"
          element={
            <PrivateRoute>
              <EditTask />
            </PrivateRoute>
          }
        />

        {/* Blogs */}
        <Route
          path="/blogs"
          element={
            <PrivateRoute>
              <BlogList />
            </PrivateRoute>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <PrivateRoute>
              <BlogDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-blog"
          element={
            <PrivateRoute>
              <CreateBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-blog/:id"
          element={
            <PrivateRoute>
              <EditBlog />
            </PrivateRoute>
          }
        />

        {/* Jadwal Kuliah */}
        <Route
          path="/jadwals"
          element={
            <PrivateRoute>
              <JadwalList />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-jadwal"
          element={
            <PrivateRoute>
              <CreateJadwal />
            </PrivateRoute>
          }
        />
        <Route
          path="/jadwal/edit/:id"
          element={
            <PrivateRoute>
              <EditJadwal />
            </PrivateRoute>
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
