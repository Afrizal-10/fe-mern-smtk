// CreateJadwal.jsx
import {useState} from "react";
import axios from "axios";
import {CalendarDays, Clock, Plus, AlertCircle, Loader2} from "lucide-react";
import {errorAlert, successAlert} from "../../utils/Swall";

const HARI_OPTIONS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export default function CreateJadwal({
  apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000",
  onCreated,
}) {
  const [form, setForm] = useState({
    hari: "",
    mata_kuliah: "",
    dosen: "",
    jam: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm((f) => ({...f, [name]: value}));
    setError("");
    setSuccess("");
  };

  const validate = () => {
    const {hari, mata_kuliah, dosen, jam} = form;
    if (!hari || !mata_kuliah || !dosen || !jam)
      return "Semua field wajib diisi.";

    const rangeRegex =
      /^([01]\d|2[0-3]):([0-5]\d)\s*-\s*([01]\d|2[0-3]):([0-5]\d)$/;
    const match = jam.trim().match(rangeRegex);
    if (!match)
      return 'Format jam harus "HH:MM - HH:MM", contoh: 10:00 - 12:00';

    const startMin = parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
    const endMin = parseInt(match[3], 10) * 60 + parseInt(match[4], 10);
    if (startMin >= endMin)
      return "Jam mulai harus lebih kecil dari jam selesai.";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        hari: form.hari,
        mata_kuliah: form.mata_kuliah,
        dosen: form.dosen,
        jam: form.jam.trim(),
      };

      const res = await axios.post(`${apiBase}api/jadwal`, payload);
      successAlert("Jadwal berhasil dibuat.");
      setForm({hari: "", mata_kuliah: "", dosen: "", jam: ""});
      if (typeof onCreated === "function") onCreated(res.data);
    } catch (err) {
      errorAlert(err.response?.data?.message || "Gagal membuat jadwal.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Tambah Jadwal Kuliah</h2>
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Hari</label>
            <select
              name="hari"
              value={form.hari}
              onChange={handleChange}
              className="w-full rounded-lg border p-2"
              required
            >
              <option value="">Pilih hari</option>
              {HARI_OPTIONS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Mata Kuliah
            </label>
            <input
              type="text"
              name="mata_kuliah"
              placeholder="Basis Data"
              value={form.mata_kuliah}
              onChange={handleChange}
              className="w-full rounded-lg border p-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Dosen</label>
          <input
            type="text"
            name="dosen"
            placeholder="Asep"
            value={form.dosen}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Jam (format: <code>HH:MM - HH:MM</code>)
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <input
              type="text"
              name="jam"
              placeholder="10:00 - 12:00"
              value={form.jam}
              onChange={handleChange}
              className="w-full rounded-lg border p-2 pl-10"
              required
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Contoh: <span className="font-medium">08:30 - 10:00</span>. Pastikan
            format dan nilai jam valid.
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white shadow hover:bg-blue-700 disabled:opacity-70"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          {submitting ? "Menyimpan..." : "Simpan Jadwal"}
        </button>
      </form>
    </div>
  );
}
