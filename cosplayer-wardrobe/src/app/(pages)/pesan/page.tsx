"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
// Pastikan interface Product memiliki properti _id dan imageUrl sesuai data dari MongoDB Atlas
import { Product } from '@/app/data/products'; 
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';

export default function OrderPage() {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const params = useParams();
  const { id } = params;

  // Mengambil URL API dari environment variable yang sudah kamu buat
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (id && API_URL) {
      const fetchProduct = async () => {
        try {
          // Menggunakan template literal untuk menggabungkan API_URL dan ID
          const res = await fetch(`${API_URL}/products/${id}`);
          if (res.ok) {
            const data = await res.json();
            setProduct(data);
          }
        } catch (error) {
          console.error("Gagal mengambil data produk:", error);
        }
      };
      fetchProduct();
    }
  }, [id, API_URL]);

  if (!product) {
    return <div className="text-center py-20">Memuat data produk...</div>;
  }
  
  const stock = 20;
  const shippingFee = 10000;
  const adminFee = 1000;

  const subtotal = product.price * quantity;
  const total = subtotal + shippingFee + adminFee;

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0 
    }).format(amount);

  const handleConfirmOrder = async () => {
    if (!product || !API_URL) return;
    
    setIsLoading(true);
    setOrderStatus('idle');

    const orderData = {
      productId: product._id, // Menggunakan _id dari MongoDB
      quantity: quantity,
      totalPrice: total
    };

    try {
      // Menggunakan API_URL untuk endpoint orders
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        throw new Error('Failed to create order');
      }

      const result = await res.json();
      console.log('Order successful:', result);
      setOrderStatus('success');

    } catch (error) {
      console.error("Gagal membuat pesanan:", error);
      setOrderStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Pesan Produk</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-[#2D2D2D]">
            {/* Memastikan imageUrl tersedia, jika tidak pakai placeholder */}
            <Image 
              src={product.imageUrl || '/placeholder-product.png'} 
              alt={product.name} 
              layout="fill" 
              objectFit="cover" 
            />
          </div>
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-2xl mt-1 text-[#E94A61] font-semibold">{formatCurrency(product.price)}</p>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#2D2D2D] p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-3">Rincian Pesanan</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Jumlah:</span>
              <div className="flex items-center space-x-4 bg-[#3C3C3C] p-2 rounded-lg">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-white hover:text-[#E94A61]"><Minus size={20} /></button>
                <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(stock, q + 1))} className="text-white hover:text-[#E94A61]"><Plus size={20} /></button>
              </div>
            </div>
            <p className="text-sm text-gray-400 text-right mt-2">Stok Tersedia: {stock}</p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-600">
                <span className="text-lg font-semibold">Subtotal:</span>
                <span className="text-2xl font-bold text-[#E94A61]">{formatCurrency(subtotal)}</span>
            </div>
          </div>

          <div className="bg-[#2D2D2D] p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-2">Lokasi Pengiriman</h3>
            <p className="text-gray-300 text-sm md:text-base">Kav.6A GHC, Jl. Ciawitali, RT.06/RW.10, Citeureup, Kec. Cimahi Utara, Kota Cimahi, Jawa Barat 40512</p>
          </div>

          <div className="bg-[#2D2D2D] p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-3">Metode Pembayaran</h3>
            <div className="bg-[#E94A61] text-white text-center font-bold py-4 rounded-lg cursor-pointer hover:bg-red-600 transition-colors">
                BARCODE QRIS
            </div>
          </div>

          <div className="text-right space-y-2 border-t border-gray-700 pt-6">
            <div className="flex justify-end space-x-8 text-gray-400 text-sm">
                <span>Harga Kostum</span>
                <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-end space-x-8 text-gray-400 text-sm">
                <span>Biaya Pengiriman</span>
                <span>{formatCurrency(shippingFee)}</span>
            </div>
            <div className="flex justify-end space-x-8 text-gray-400 text-sm">
                <span>Biaya Admin</span>
                <span>{formatCurrency(adminFee)}</span>
            </div>
            <div className="flex justify-end items-baseline space-x-4 mt-4">
                <span className="text-xl font-bold">Total Keseluruhan:</span>
                <span className="text-3xl font-extrabold text-[#E94A61]">{formatCurrency(total)}</span>
            </div>
            
            <div className="pt-6">
              <button 
                onClick={handleConfirmOrder}
                disabled={isLoading}
                className="w-full md:w-auto bg-[#E94A61] hover:bg-red-600 text-white font-bold py-4 px-16 rounded-xl transition-all text-lg disabled:bg-gray-600 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? 'Sedang Memproses...' : 'Konfirmasi Pesanan'}
              </button>
              {orderStatus === 'success' && (
                <div className="bg-green-900/30 text-green-400 p-4 rounded-lg mt-4 text-center border border-green-800">
                  🎉 Pesanan berhasil dibuat! Silakan cek riwayat pesanan Anda.
                </div>
              )}
              {orderStatus === 'error' && (
                <div className="bg-red-900/30 text-red-400 p-4 rounded-lg mt-4 text-center border border-red-800">
                  ❌ Terjadi kesalahan koneksi ke server. Mohon coba lagi.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}