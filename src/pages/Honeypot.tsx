import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { initBotDetection, detectBot, logBotDetection } from '@/utils/botDetector';
import { 
  FakeProduct, 
  generateProducts, 
  generateProductById, 
  generateReviews 
} from '@/utils/contentGenerator';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  Menu, 
  ChevronRight,
  ChevronLeft,
  Star,
  StarHalf,
  Filter,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { logHoneypotInteraction } from "@/utils/supabaseHoneypot";

const Honeypot = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<FakeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [visibleCategories, setVisibleCategories] = useState<string[]>([]);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [currentProduct, setCurrentProduct] = useState<FakeProduct | null>(null);
  const [productReviews, setProductReviews] = useState<any[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const category = searchParams.get('category');
  const sort = searchParams.get('sort') || 'popular';
  const productId = searchParams.get('product');
  
  React.useEffect(() => {
    if (!sessionStorage.getItem("abyss_session_id")) {
      sessionStorage.setItem(
        "abyss_session_id",
        Math.random().toString(36).substring(2) + Date.now().toString(36)
      );
    }
  }, []);

  const sessionId =
    sessionStorage.getItem("abyss_session_id") ??
    Math.random().toString(36).substring(2);

  const extendedLogBotDetection = React.useCallback(
    (result: any, interaction_type: string, extra: Partial<any> = {}) => {
      if (typeof logBotDetection === "function") logBotDetection(result);
      logHoneypotInteraction({
        session_id: sessionId,
        fingerprint: result.fingerprint,
        user_agent: result.userAgent,
        ip_address: "",
        interaction_type,
        url_path: window.location.pathname + window.location.search,
        request_headers: {},
        time_spent: Date.now() - (window as any).abyss_loaded,
        is_bot: result.isBot,
        bot_type: result.botType,
        confidence: result.confidence,
        mouse_movements: (window as any).abyss_mouse_moves ?? 0,
        keyboard_interactions: (window as any).abyss_keyboard_ints ?? 0,
        navigation_speed: 0,
        ...extra,
        timestamp: new Date().toISOString(),
      });
    },
    [sessionId]
  );

  React.useEffect(() => {
    (window as any).abyss_loaded = Date.now();
    (window as any).abyss_mouse_moves = 0;
    (window as any).abyss_keyboard_ints = 0;
    const incMouse = () => ((window as any).abyss_mouse_moves += 1);
    const incKey = () => ((window as any).abyss_keyboard_ints += 1);
    window.addEventListener("mousemove", incMouse);
    window.addEventListener("keydown", incKey);
    return () => {
      window.removeEventListener("mousemove", incMouse);
      window.removeEventListener("keydown", incKey);
    };
  }, []);

  useEffect(() => {
    initBotDetection();

    const result = detectBot();
    extendedLogBotDetection(result, "page_load");

    setLoading(true);

    if (productId) {
      setCurrentProductId(productId);
      const product = generateProductById(productId);
      setCurrentProduct(product);
      setProductReviews(generateReviews(productId, Math.floor(Math.random() * 10) + 5));
      setProducts([]);
    } else {
      setCurrentProductId(null);
      setCurrentProduct(null);
      
      const generatedProducts = generateProducts(20);
      
      const filteredProducts = category 
        ? generatedProducts.filter(p => p.category === category)
        : generatedProducts;
      
      const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sort === 'price-low') return a.price - b.price;
        if (sort === 'price-high') return b.price - a.price;
        if (sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return b.rating - a.rating;
      });
      
      setProducts(sortedProducts);
      
      const allCategories = Array.from(new Set(generatedProducts.map(p => p.category)));
      setVisibleCategories(allCategories);
    }
    
    setLoading(false);
    
    setTimeout(() => {
      const hiddenLinks = document.querySelectorAll('.hidden-link');
      
      hiddenLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const botDetection = detectBot();
          extendedLogBotDetection(
            { ...botDetection, isBot: true, confidence: 1.0, reasons: [...(botDetection.reasons || []), 'Clicked hidden honeypot link'] },
            "hidden_link_click"
          );
          navigate(`/honeypot?page=${Math.floor(Math.random() * 1000) + 100}`);
        });
      });
    }, 500);
  }, [currentPage, category, sort, productId, navigate, extendedLogBotDetection]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/honeypot?search=${encodeURIComponent(searchQuery)}&page=1`);
    const botDetection = detectBot();
    extendedLogBotDetection(botDetection, "search_submit");
  };

  const handleFilterToggle = (categoryName: string) => {
    if (activeFilters.includes(categoryName)) {
      setActiveFilters(activeFilters.filter(c => c !== categoryName));
    } else {
      setActiveFilters([...activeFilters, categoryName]);
    }
  };

  const changePage = (newPage: number) => {
    navigate(`/honeypot?page=${newPage}${category ? `&category=${category}` : ''}${sort ? `&sort=${sort}` : ''}`);
    window.scrollTo(0, 0);
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

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

  return (
    <div className="honeypot min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu className="h-6 w-6" />
              </Button>
              <Link to="/honeypot" className="text-blue-600 text-xl font-bold flex items-center">
                ShopAbyss
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <Link to="/honeypot" className="hover:text-blue-600">Home</Link>
              <Link to="/honeypot?category=Electronics" className="hover:text-blue-600">Electronics</Link>
              <Link to="/honeypot?category=Fashion" className="hover:text-blue-600">Fashion</Link>
              <Link to="/honeypot?category=Home%20%26%20Kitchen" className="hover:text-blue-600">Home & Kitchen</Link>
              <Link to="/honeypot?category=Beauty%20%26%20Personal%20Care" className="hover:text-blue-600">Beauty</Link>
              
              <a href="/honeypot?page=bot-trap-1" className="hidden-link">Special Offers</a>
              <a href="/honeypot?page=bot-trap-2" className="hidden-link">Private Sale</a>
              <a href="/honeypot?page=bot-trap-3" className="hidden-link">Admin</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="w-[200px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" variant="ghost" size="icon" className="absolute right-0">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
                </Button>
              </div>
            </div>
          </div>
          
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <form onSubmit={handleSearchSubmit} className="mb-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>
              
              <nav className="space-y-2 text-sm font-medium">
                <Link to="/honeypot" className="block hover:text-blue-600 py-2">Home</Link>
                <Link to="/honeypot?category=Electronics" className="block hover:text-blue-600 py-2">Electronics</Link>
                <Link to="/honeypot?category=Fashion" className="block hover:text-blue-600 py-2">Fashion</Link>
                <Link to="/honeypot?category=Home%20%26%20Kitchen" className="block hover:text-blue-600 py-2">Home & Kitchen</Link>
                <Link to="/honeypot?category=Beauty%20%26%20Personal%20Care" className="block hover:text-blue-600 py-2">Beauty</Link>
              </nav>
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {currentProduct && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="col-span-full mb-4">
              <nav className="text-sm">
                <ol className="flex items-center space-x-2">
                  <li>
                    <Link to="/honeypot" className="text-blue-600 hover:text-blue-800">Home</Link>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                    <Link to={`/honeypot?category=${encodeURIComponent(currentProduct.category)}`} className="text-blue-600 hover:text-blue-800">
                      {currentProduct.category}
                    </Link>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 truncate max-w-[200px]">{currentProduct.name}</span>
                  </li>
                </ol>
              </nav>
            </div>
            
            <div className="flex justify-center">
              <img 
                src={currentProduct.image} 
                alt={currentProduct.name}
                className="object-contain w-full max-h-[400px] rounded-lg border border-gray-200"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">{currentProduct.name}</h1>
                <div className="mt-2 flex items-center">
                  {renderStarRating(currentProduct.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    {currentProduct.rating.toFixed(1)} ({currentProduct.reviewCount} reviews)
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">Sold by {currentProduct.seller}</p>
              </div>
              
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">{formatPrice(currentProduct.price)}</span>
                {currentProduct.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(currentProduct.originalPrice)}
                  </span>
                )}
                {currentProduct.originalPrice && (
                  <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded">
                    Save {formatPrice(currentProduct.originalPrice - currentProduct.price)}
                  </span>
                )}
              </div>
              
              <div className="text-sm text-gray-700 space-y-2">
                <p>{currentProduct.description.split('\n\n')[0]}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`text-sm px-2 py-1 rounded ${currentProduct.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {currentProduct.stock > 0 ? `In Stock (${currentProduct.stock} available)` : 'Out of Stock'}
                </span>
                
                {currentProduct.tags.map((tag, i) => (
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
                {currentProduct.description.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
            
            <div className="col-span-full mt-8">
              <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
              
              <div className="space-y-6">
                {productReviews.map((review, i) => (
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
            
            <div className="col-span-full mt-12">
              <h2 className="text-xl font-bold mb-6">You Might Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {generateProducts(4).map((product, i) => (
                  <Link key={i} to={`/honeypot?product=${product.id}`} className="group">
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-36 object-contain p-4"
                      />
                      <div className="p-3">
                        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600">{product.name}</h3>
                        <div className="mt-1 flex items-center">
                          {renderStarRating(product.rating)}
                          <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
                        </div>
                        <div className="mt-1 font-medium text-gray-900">{formatPrice(product.price)}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {!currentProduct && (
          <>
            <header className="mb-6">
              <h1 className="text-2xl font-bold">
                {category ? `${category} Products` : 'All Products'}
              </h1>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-gray-600">
                  Showing page {currentPage} • {products.length} products
                </p>
                <div className="flex items-center">
                  <Button variant="ghost" size="sm" className="hidden md:flex" onClick={() => setFiltersOpen(!filtersOpen)}>
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <select
                    className="ml-2 text-sm border rounded px-2 py-1"
                    value={sort || 'popular'}
                    onChange={(e) => navigate(`/honeypot?page=1${category ? `&category=${category}` : ''}&sort=${e.target.value}`)}
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </header>
            
            <div className="flex flex-col md:flex-row gap-6">
              <aside className={`w-full md:w-64 space-y-6 ${filtersOpen ? 'block' : 'hidden md:block'}`}>
                <div className="md:hidden flex justify-between items-center mb-2">
                  <h2 className="font-medium">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={() => setFiltersOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {visibleCategories.map((cat, i) => (
                      <div key={i} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`cat-${i}`}
                          checked={cat === category}
                          onChange={() => navigate(`/honeypot?category=${cat}`)}
                          className="rounded text-blue-600"
                        />
                        <label htmlFor={`cat-${i}`} className="ml-2 text-sm text-gray-700">
                          {cat}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Min" type="number" className="text-sm" />
                      <Input placeholder="Max" type="number" className="text-sm" />
                    </div>
                    <Button className="w-full text-sm">Apply</Button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-3">Customer Rating</h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`rating-${rating}`}
                          className="rounded text-blue-600"
                        />
                        <label htmlFor={`rating-${rating}`} className="ml-2 flex items-center">
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          {Array.from({ length: 5 - rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gray-300" />
                          ))}
                          <span className="ml-1 text-sm text-gray-700">& Up</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="md:hidden flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setFiltersOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1">Apply Filters</Button>
                </div>
              </aside>
              
              <div className="md:hidden sticky top-[68px] z-10 bg-white shadow-sm -mx-4 px-4 py-2 mb-4">
                <Button variant="outline" onClick={() => setFiltersOpen(true)} className="w-full flex items-center justify-center">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
              
              <div className="flex-1">
                {loading ? (
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
                ) : (
                  <>
                    {products.length === 0 ? (
                      <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600">Try changing your search or filter criteria</p>
                      </div>
                    ) : (
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
                    )}
                  </>
                )}
                
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      disabled={currentPage <= 1}
                      onClick={() => changePage(currentPage - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant={currentPage === 1 ? "default" : "outline"}
                      onClick={() => changePage(1)}
                    >
                      1
                    </Button>
                    
                    {currentPage > 3 && <span className="px-2">...</span>}
                    
                    {currentPage > 2 && (
                      <Button 
                        variant="outline"
                        onClick={() => changePage(currentPage - 1)}
                      >
                        {currentPage - 1}
                      </Button>
                    )}
                    
                    {currentPage !== 1 && (
                      <Button 
                        variant={currentPage === 1 ? "outline" : "default"}
                        onClick={() => changePage(currentPage)}
                      >
                        {currentPage}
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline"
                      onClick={() => changePage(currentPage + 1)}
                    >
                      {currentPage + 1}
                    </Button>
                    
                    <span className="px-2">...</span>
                    
                    <Button 
                      variant="outline"
                      onClick={() => changePage(currentPage + 50)}
                    >
                      {currentPage + 50}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => changePage(currentPage + 1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      
      <footer className="bg-gray-100 border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">ShopAbyss</h3>
              <p className="text-sm text-gray-600">
                Your one-stop shop for all your shopping needs. Find the best products at amazing prices.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Shop Categories</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/honeypot?category=Electronics" className="text-gray-600 hover:text-blue-600">Electronics</Link></li>
                <li><Link to="/honeypot?category=Fashion" className="text-gray-600 hover:text-blue-600">Fashion</Link></li>
                <li><Link to="/honeypot?category=Home%20%26%20Kitchen" className="text-gray-600 hover:text-blue-600">Home & Kitchen</Link></li>
                <li><Link to="/honeypot?category=Toys%20%26%20Games" className="text-gray-600 hover:text-blue-600">Toys & Games</Link></li>
                <li><Link to="/honeypot?category=Beauty%20%26%20Personal%20Care" className="text-gray-600 hover:text-blue-600">Beauty & Personal Care</Link></li>
              </ul>
              
              <ul className="mt-4">
                <li><a href="/honeypot?page=secure-admin" className="hidden-link">Admin Login</a></li>
                <li><a href="/honeypot?page=private-data" className="hidden-link">API Keys</a></li>
                <li><a href="/honeypot?page=customer-data" className="hidden-link">Customer Database</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Shipping Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Returns & Refunds</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Order Status</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Payment Methods</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Stay Connected</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.16a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.859.07-3.211 0-3.586-.015-4.859-.074-1.17.255-1.816-.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/></svg>
                </a>
              </div>
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Sign up for our newsletter</h5>
                <form className="flex">
                  <Input type="email" placeholder="Your email" className="w-full rounded-r-none" />
                  <Button className="rounded-l-none">Subscribe</Button>
                </form>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">
              &copy; 2025 ShopAbyss. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600">Terms of Service</a>
              <a href="#" className="hover:text-blue-600">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Honeypot;
