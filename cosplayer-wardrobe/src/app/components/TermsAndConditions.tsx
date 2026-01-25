"use client";

import { useState } from 'react';

// ... (Konten termsContent sama persis seperti respons saya sebelumnya)
const termsContent = {
  main: {
    title: 'Syarat & Ketentuan',
    content: [
      'Wajib membayar DP 75k per kostum yang akan disewa.',
      'Jika tidak DP, maka dianggap tidak sewa.',
      'Order maksimal hari Rabu apa pun yang terjadi.',
      'Order maksimal hari Kamis khusus untuk domisili yang mendukung Paxel saja.',
      'Wajib membayar uang denda sesuai yang ditentukan admin apabila diketahui kostum kembali dengan keadaan berikut ini:',
      '1. Aksesori hilang',
      '2. Wig kusut seperti pasca dipakai konser band metal',
      '3. Kostum kotor dengan noda make up, noda tanah, dan sejenisnya',
      '4. Kostum dengan kondisi baunya bisa membangkitkan orang mati',
      '5. Packing asal-asalan, tidak dilapisi packaging yang aman',
    ],
  },
  shipping: {
    title: 'Pengiriman & Pengembalian',
    content: [
        'Untuk rental weekend, pengiriman akan diatur oleh admin dengan jadwal kirim:',
        '• Rabu–Kamis untuk wilayah di luar Jabodetabek',
        '• Kamis–Jumat untuk wilayah sekitar Jabodetabek',
        'Sedangkan untuk rental weekdays, kostum akan dikirim H-3 sebelum pakai (luar Jabodetabek) atau H-2 sebelum pakai (Jabodetabek).',
        'Hanya menerima jasa ekspedisi dengan pengiriman Sameday, Instant, Nextday, atau esok sampai (estimasi 1–2 hari).',
        'Luar Jabodetabek hanya menerima pembookingan dan pelunasan terakhir hari Rabu malam, lewat dari itu refund DP / re-schedule.',
        'Bisa COD ke rumah owner bagi yang merasa domisilinya dekat, tapi wajib mengabari terlebih dahulu jika mau datang ke rumah. COD hanya untuk pengambilan dan pengembalian kostum saja, tidak bisa fitting!',
        'Keterlambatan pengiriman di luar kuasa admin, kami hanya bisa bantu follow-up ke ekspedisi saja jika ada masalah.',
    ],
  },
  refund: {
    title: 'Denda & Refund',
    content: [
      { item: 'Rusak / Sobek / Patah', price: 'Rp10.000 – Rp25.000' },
      { item: 'Sobek di jahitan', price: 'Ganti baru' },
      { item: 'Sobek di kain', price: 'Rp20.000 + ganti baru' },
      { item: 'Aksesori rusak/patah', price: 'Rp30.000 + ganti baru' },
      { item: 'Wig dipotong/lem/styling tanpa izin', price: 'Rp50.000' },
      { item: 'Pengait wig patah', price: 'Ganti baru' },
      { item: 'Wig kusut', price: '' },
      { item: '  • Wig pendek 20–30 cm', price: 'Rp5.000 – Rp10.000' },
      { item: '  • Wig medium 40–50 cm', price: 'Rp15.000 – Rp20.000' },
      { item: '  • Wig panjang ≥60 cm', price: 'Rp25.000 – Rp35.000' },
      { item: '  • Wig kusut paran / rambut gulali', price: 'Ganti baru' },
      { item: 'Clip-on kusut', price: 'Rp15.000 – Rp35.000' },
    ],
  },
};

type Section = keyof typeof termsContent;

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState<Section>('shipping'); // Default ke Pengiriman & Pengembalian
  const currentContent = termsContent[activeSection];

  const renderContent = () => {
    // ... (Fungsi renderContent sama persis seperti respons saya sebelumnya)
    if (activeSection === 'refund') {
        const items = currentContent.content as { item: string; price: string }[];
        return (
            <ul className="space-y-2 text-gray-300">
                {items.map((c, index) => (
                    <li key={index} className="flex justify-between items-baseline whitespace-pre">
                        <span>{c.item}</span>
                        <span className="border-b-2 border-dotted border-gray-500 flex-grow mx-2"></span>
                        <span className="font-semibold">{c.price}</span>
                    </li>
                ))}
            </ul>
        );
    }
    const items = currentContent.content as string[];
    return (
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
            {items.map((c, index) => <li key={index}>{c}</li>)}
        </ul>
    );
  };


  return (
    <section className="bg-[#2D2D2D] p-8 rounded-2xl max-w-4xl mx-auto mt-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Syarat dan Ketentuan</h1>
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="bg-[#E94A61] p-6 rounded-lg h-full flex flex-col justify-center items-center text-center">
                 {(Object.keys(termsContent) as Section[]).map(key => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={`w-full font-bold text-2xl p-4 transition-opacity ${
                      activeSection === key ? 'opacity-100' : 'opacity-70 hover:opacity-90'
                    }`}
                  >
                    {termsContent[key].title}
                  </button>
                ))}
            </div>
        </div>
        {/* Content */}
        <div className="w-full md:w-2/3">
          {renderContent()}
        </div>
      </div>
    </section>
  );
}