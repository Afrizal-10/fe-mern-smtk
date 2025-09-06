const AddTask = ({form, onChange, onFileChange, onSubmit, onCancel}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-30 bg-black/30 px-4">
      <form
        onSubmit={onSubmit}
        className="bg-white p-5 sm:p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-4">
          Tambah Tugas Baru
        </h3>

        <input
          type="text"
          name="title"
          placeholder="Judul Tugas"
          value={form.title}
          onChange={onChange}
          required
          className="w-full border border-gray-300 rounded p-2 mb-3 text-sm sm:text-base"
        />
        <textarea
          name="description"
          placeholder="Deskripsi Tugas"
          value={form.description}
          onChange={onChange}
          rows={3}
          className="w-full border border-gray-300 rounded p-2 mb-3 text-sm sm:text-base"
        />
        <input
          type="text"
          name="course"
          placeholder="Mata Kuliah"
          value={form.course}
          onChange={onChange}
          required
          className="w-full border border-gray-300 rounded p-2 mb-3 text-sm sm:text-base"
        />
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={onChange}
          required
          className="w-full border border-gray-300 rounded p-2 mb-3 text-sm sm:text-base"
        />
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={onFileChange}
          className="w-full mb-3 text-sm"
        />
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 sm:px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm sm:text-base"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-3 sm:px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm sm:text-base"
          >
            Simpan Tugas
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
