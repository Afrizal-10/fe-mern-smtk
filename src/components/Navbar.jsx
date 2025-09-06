import React from "react";
import {useNavigate} from "react-router-dom";

const Navbar = ({onLogout}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    onLogout?.();
    navigate("/login");
  };

  return (
    <nav className="bg-[#113F67] p-4 flex justify-between items-center shadow-md">
      <h1 className="text-white text-lg sm:text-xl font-bold">
        Dashboard Mahasiswa
      </h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
