"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Product } from '@/app/data/products';
import Image from 'next/image';
import { Star } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/app/components/ProductCard';

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [otherProducts, setOtherProducts] = useState<Product[]>([]);
  const [mainImage, setMainImage] = useState<string>('');
  const [activeTab, setActiveTab] = useState('deskripsi');
  const params = useParams();
  const { id } = params;

  // Mengambil Base URL dari environment variable yang sudah kamu buat
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (id && API_URL) {
      const fetchProduct = async () => {
        try {
          // Menggunakan API_URL agar dinamis
          const res = await fetch(`${API_URL}/products/${id}`);
          if (res.ok) {
            const data: Product = await res.json();
            setProduct(data);
            if (data.imageUrl && data.imageUrl.length > 0) {
              setMainImage(data.imageUrl[0]);
            }
          } else {
            setProduct(null);
          }
        } catch (error) {
          console.error("Failed to fetch product details:", error);
          setProduct(null);
        }
      };
      
      const fetchOtherProducts = async () => {
         try {
            // Menggunakan API_URL agar dinamis
            const res = await fetch(`${API_URL}/products`);
            if(res.ok) {
                const data = await res.json();
                setOtherProducts(data.filter((p: Product) => p._id !== id).slice(0, 4));
            }
         } catch (error) {
            console.error("Failed to fetch other products:", error)
         }
      };
      
      fetchProduct();
      fetchOtherProducts();
    }
  }, [id, API_URL]); // Menambahkan API_URL ke dependency array

  if (!product) {
    return <div className="text-center py-10">Loading product...</div>;
  }

  const formatPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price);

  const ratingDistribution = { five: 15, four: 20, three: 0, two: 0, one: 0 };
  const totalRatings = Object.values(ratingDistribution).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-16">
      <div className="bg-[#2D2D2D] p-8 rounded-2xl">
        <h2 className="text-3xl font-bold mb-6">Detail Produk</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column: Product Image */}
          <div>
            <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden mb-4">
              {/* Menambahkan fallback jika mainImage kosong */}
              <Image 
                src={mainImage || (product.imageUrl && product.imageUrl[0]) || '/placeholder.png'} 
                alt={product.name} 
                layout="fill" 
                objectFit="cover" 
              />
            </div>
          </div>
          
          {/* Right Column: Product Info */}
          <div>
            <div className="flex justify-between items-start mb-2">
                <h1 className="text-4xl font-bold">{product.name}</h1>
                <div className="bg-[#3C3C3C] p-3 rounded-xl text-center flex-shrink-0">
                    <div className="flex items-center justify-center space-x-1">
                        <Star className="text-yellow-400 fill-current" size={20} />
                        <span className="text-lg font-bold">{product.rating}</span>
                    </div>
                    <div className="mt-2 space-y-1 w-24">
                        {[5, 4, 3, 2, 1].map(star => (
                            <div key={star} className="flex items-center gap-x-1">
                                <span className="text-xs text-gray-400">{star}</span>
                                <div className="w-full bg-gray-600 rounded-full h-1.5">
                                    <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${(ratingDistribution[star === 5 ? 'five' : star === 4 ? 'four' : star === 3 ? 'three' : star === 2 ? 'two' : 'one'] / totalRatings) * 100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <p className="text-3xl font-semibold my-4">{formatPrice}</p>
            <div className="flex space-x-2 mb-6">
                <span className="bg-[#3C3C3C] text-white/80 text-sm font-semibold px-4 py-2 rounded-lg">XL</span>
                <span className="bg-[#3C3C3C] text-white/80 text-sm font-semibold px-4 py-2 rounded-lg">L</span>
                <span className="bg-[#E94A61]/20 text-[#E94A61] text-xs font-bold px-3 py-1 rounded-full flex items-center">LD=90-98</span>
            </div>
            <div className="flex space-x-2 mb-6 border-b border-gray-700">
              <button onClick={() => setActiveTab('deskripsi')} className={`py-2 px-4 font-semibold ${activeTab === 'deskripsi' ? 'text-white border-b-2 border-[#E94A61]' : 'text-gray-400'}`}>Deskripsi</button>
              <button onClick={() => setActiveTab('ulasan')} className={`py-2 px-4 font-semibold ${activeTab === 'ulasan' ? 'text-white border-b-2 border-[#E94A61]' : 'text-gray-400'}`}>Ulasan</button>
            </div>
            <div className="min-h-[100px]">
              {activeTab === 'deskripsi' ? (
                <p className="text-gray-300">{product.description}</p>
              ) : (
                <p className="text-gray-400">Fitur ulasan akan segera hadir.</p>
              )}
            </div>
            <Link href={`/pesan/${product._id}`} className="block w-full text-center bg-[#E94A61] hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors mt-6">Pesan</Link>
          </div>
        </div>
      </div>
      
      {/* Other Suggestions Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Saran kostum lainnya</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {otherProducts.map(p => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}