export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';

export default function AdminPage() {
  // Sementara kita buat tampilan dashboard sederhana
  return (
    <div className="p-8 text-white bg-[#2D2D2D] rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-[#E94A61]">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#3C3C3C] p-6 rounded-xl">
          <h2 className="text-xl font-bold">Total Produk</h2>
          <p className="text-4xl mt-2">4</p>
        </div>
        <div className="bg-[#3C3C3C] p-6 rounded-xl cursor-pointer hover:bg-[#4a4a4a]">
          <h2 className="text-xl font-bold">+ Tambah Produk Baru</h2>
          <p className="text-sm text-gray-400">Klik untuk input kostum baru</p>
        </div>
      </div>
    </div>
  );
}