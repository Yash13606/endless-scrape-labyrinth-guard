
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { FakeProduct } from '@/utils/contentGenerator';

interface ProductListProps {
  products: FakeProduct[];
  loading: boolean;
  currentPage: number;
}

const ProductList = ({ products, loading, currentPage }: ProductListProps) => {
  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half-star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return <div className="flex">{stars}</div>;
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-0">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try changing your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, i) => (
        <Link key={i} to={`/honeypot?product=${product.id}`} className="group">
          <Card className="overflow-hidden hover:border-blue-300 transition-colors">
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-contain p-4"
                />
                {product.originalPrice && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>
              <div className="p-3 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600">{product.name}</h3>
                <div className="mt-1 flex items-center">
                  {renderStarRating(product.rating)}
                  <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-medium text-gray-900">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
                <div className="mt-2">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {product.stock > 0 ? `In Stock` : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
      
      {Array.from({ length: 5 }).map((_, i) => (
        <a key={`trap-${i}`} href={`/honeypot?page=${currentPage + 100 + i}`} className="hidden-link">
          Special Product {i}
        </a>
      ))}
    </div>
  );
};

export default ProductList;
