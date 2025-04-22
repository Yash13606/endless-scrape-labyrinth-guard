import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import HoneypotLayout from '@/components/honeypot/HoneypotLayout';
import ProductList from '@/components/honeypot/ProductList';
import ProductDetail from '@/components/honeypot/ProductDetail';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Filter, SlidersHorizontal, X, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { initBotDetection, detectBot } from '@/utils/botDetector';
import { FakeProduct, generateProducts, generateProductById, generateReviews } from '@/utils/contentGenerator';
import { logHoneypotInteraction } from "@/utils/supabaseHoneypot";
import { useExtendedLogBotDetection } from '@/utils/useExtendedLogBotDetection';

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

  const extendedLogBotDetection = useExtendedLogBotDetection();

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

  return (
    <HoneypotLayout>
      {currentProduct ? (
        <ProductDetail product={currentProduct} reviews={productReviews} />
      ) : (
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
              <ProductList 
                products={products}
                loading={loading}
                currentPage={currentPage}
              />
              
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
    </HoneypotLayout>
  );
};

export default Honeypot;
