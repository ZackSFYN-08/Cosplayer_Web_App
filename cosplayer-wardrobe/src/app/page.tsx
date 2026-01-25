import ProductCard from '@/app/components/ProductCard';
import TermsAndConditions from '@/app/components/TermsAndConditions';
import { Product } from '@/app/data/products';
import Image from 'next/image';

// Fungsi ini akan mengambil 8 produk dari API
async function getProducts() {
  try {
    // Pastikan backend Anda berjalan di http://localhost:5001
    const res = await fetch('http://localhost:5001/api/products', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Gagal mengambil data produk');
    }
    const products = await res.json();
    // Mengembalikan 8 produk pertama untuk ditampilkan
    return products.slice(0, 8);
  } catch (error) {
    console.error("Error saat mengambil produk:", error);
    return []; // Kembalikan array kosong jika terjadi error
  }
}

export default async function HomePage() {
  const recommendedProducts: Product[] = await getProducts();

  return (
    <div className="space-y-12">
      {/* Bagian Hero Banner */}
      <section className="relative h-100 rounded-2xl overflow-hidden flex items-center p-12">
        <Image 
          src="/images/home-banner.png" 
          alt="Welcome banner" 
          layout="fill" 
          objectFit="cover" 
          className="z-0" 
          priority
        />
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20">
          <p className="text-lg">Welcome to Cosplayer Wardrobe</p>
          <h1 className="text-5xl font-extrabold mt-2">MAU COSPLAY</h1>
          <h1 className="text-5xl font-extrabold">APA HARI INI?</h1>
        </div>
      </section>

      {/* Bagian Saran Kostum */}
      <section>
        <div className="bg-[#2D2D2D] p-8 rounded-2xl">
          <h2 className="text-3xl font-bold mb-6">Saran kostum untuk kamu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendedProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Bagian Syarat dan Ketentuan */}
      <TermsAndConditions />
    </div>
  );
}