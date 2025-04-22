import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, StarHalf, ChevronRight, Heart } from 'lucide-react';
import { FakeProduct } from '@/utils/contentGenerator';

interface ProductDetailProps {
  product: FakeProduct;
  reviews: any[];
}

const ProductDetail = ({ product, reviews }: ProductDetailProps) => {
  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="col-span-full mb-4">
        <nav className="text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/honeypot" className="text-blue-600 hover:text-blue-800">Home</Link>
            </li>
            <li className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <Link to={`/honeypot?category=${encodeURIComponent(product.category)}`} className="text-blue-600 hover:text-blue-800">
                {product.category}
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 truncate max-w-[200px]">{product.name}</span>
            </li>
          </ol>
        </nav>
      </div>
      
      <div className="flex justify-center">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-contain w-full max-h-[400px] rounded-lg border border-gray-200"
        />
      </div>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="mt-2 flex items-center">
            {renderStarRating(product.rating)}
            <span className="ml-2 text-sm text-gray-600">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600">Sold by {product.seller}</p>
        </div>
        
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-lg text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          {product.originalPrice && (
            <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded">
              Save {formatPrice(product.originalPrice - product.price)}
            </span>
          )}
        </div>
        
        <div className="text-sm text-gray-700 space-y-2">
          <p>{product.description.split('\n\n')[0]}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`text-sm px-2 py-1 rounded ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
          </span>
          
          {product.tags.map((tag, i) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          <Button className="flex-grow bg-blue-600 hover:bg-blue-700">
            Add to Cart
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="col-span-full mt-6">
        <h2 className="text-xl font-bold mb-4">Product Description</h2>
        <div className="space-y-4 text-gray-700">
          {product.description.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
      
      <div className="col-span-full mt-8">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        
        <div className="space-y-6">
          {reviews.map((review, i) => (
            <div key={i} className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <img 
                    src={review.avatar} 
                    alt={review.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{review.title}</h3>
                    <div className="flex items-center mt-1">
                      {renderStarRating(review.rating)}
                      <span className="ml-2 text-sm text-gray-500">
                        {review.verified && (
                          <span className="text-green-600 font-medium ml-2">Verified Purchase</span>
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      By {review.username} on {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-gray-700">
                <p>{review.content}</p>
              </div>
              <div className="mt-3 flex items-center text-sm">
                <Button variant="ghost" size="sm">
                  Helpful ({review.likes})
                </Button>
                <Button variant="ghost" size="sm">
                  Report
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
