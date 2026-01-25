import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import type { Product } from '@/app/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formatPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(product.price);

  // Fallback image in case the imageUrl array is empty
  const imageUrl = product.imageUrl && product.imageUrl.length > 0 
    ? product.imageUrl[0] 
    : '/images/placeholder.png'; // Make sure you have a placeholder image at public/images/placeholder.png

  return (
    <Link href={`/produk/${product._id}`} className="block bg-[#3C3C3C] rounded-2xl overflow-hidden group">
      <div className="relative w-full h-48">
        <Image
          src={imageUrl} // <-- Use the selected single image URL
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-white">{product.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <p className="text-white font-semibold">{formatPrice.replace('Rp', 'Rp')}</p>
          <div className="flex items-center space-x-1">
            <Star className="text-yellow-400 fill-current" size={16} />
            <span className="text-sm text-gray-300">{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;