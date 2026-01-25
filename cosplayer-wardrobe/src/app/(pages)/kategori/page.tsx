import ProductCard from '@/app/components/ProductCard';
import { products, Product } from '@/app/data/products';

type KategoriPageProps = {
  params: { slug: string };
};

export default function KategoriPage({ params }: KategoriPageProps) {
  const { slug } = params;

  let sortedProducts: Product[] = [...products];
  let title = "Kategori";

  if (slug === 'termurah') {
    title = 'Termurah';
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (slug === 'up-rating') {
    title = 'Up-Rating';
    sortedProducts.sort((a, b) => b.rating - a.rating);
  } else if (slug === 'tersedia') {
    title = 'Tersedia';
    // Logic for available products can be added here
  }

  return (
    <div className="bg-[#2D2D2D] p-8 rounded-2xl">
      <h1 className="text-4xl font-bold mb-8 capitalize">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}