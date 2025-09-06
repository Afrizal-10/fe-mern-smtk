const Footer = () => {
  return (
    <footer className="bg-[#113F67] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src="fasilkom.png"
              alt="Logo Unsub"
              className="w-10 h-10 object-contain"
            />
            <h3 className="text-2xl font-bold">KuliahApp</h3>
          </div>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-md">
            KuliahApp membantu mahasiswa mengelola tugas, blog, dan jadwal
            kuliah dengan mudah, cepat, dan efisien. Pantau semua kegiatan
            kuliahmu dalam satu aplikasi praktis dan responsif.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Kontak</h3>
          <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
            <li>Adi Juliyanto Afrizal</li>
            <li>Fakultas Ilmu Komputer</li>
            <li>Jl. Irigasi Salamdarma, Anjatan, Indramayu, Jawa Barat</li>
            <li>
              Telp: <span className="font-medium">+62 821-3358-1984</span>
            </li>
            <li>
              Email:{" "}
              <span className="font-medium">
                adijuliyantoafrizal10@gmail.com
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/20 py-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} KuliahApp • Universitas Subang. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
