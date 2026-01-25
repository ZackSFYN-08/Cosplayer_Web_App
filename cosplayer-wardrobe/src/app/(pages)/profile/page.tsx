export default function ProfilePage() {
  return (
    <div className="bg-[#2D2D2D] p-8 rounded-2xl max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Form Data Diri</h1>
      <form className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block mb-2 text-lg text-gray-200">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="fullName"
            className="w-full bg-[#E94A61] placeholder-white/70 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Ketik disini"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-lg text-gray-200">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            className="w-full bg-[#E94A61] placeholder-white/70 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Ketik disini"
          />
        </div>

        <div>
          <label htmlFor="nik" className="block mb-2 text-lg text-gray-200">
            NIK
          </label>
          <input
            type="text"
            id="nik"
            className="w-full bg-[#E94A61] placeholder-white/70 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Ketik disini"
          />
        </div>

        <div>
          <label htmlFor="ktp" className="block mb-2 text-lg text-gray-200">
            Upload foto KTP
          </label>
          <div className="flex">
            <label htmlFor="ktp" className="cursor-pointer bg-white text-gray-800 font-semibold py-2 px-4 rounded-l-lg">
                Choose File
            </label>
            <input
              type="file"
              id="ktp"
              className="hidden"
            />
             <span className="w-full bg-[#E94A61] text-white/70 rounded-r-lg p-3"></span>
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block mb-2 text-lg text-gray-200">
            Alamat
          </label>
          <textarea
            id="address"
            rows={5}
            className="w-full bg-[#E94A61] placeholder-white/70 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Ketik disini"
          ></textarea>
        </div>

        <div className="flex justify-end pt-4">
            <button type="submit" className="bg-[#E94A61] hover:bg-red-600 text-white font-bold py-3 px-12 rounded-lg transition-colors text-lg">
                Pesan
            </button>
        </div>
      </form>
    </div>
  );
}