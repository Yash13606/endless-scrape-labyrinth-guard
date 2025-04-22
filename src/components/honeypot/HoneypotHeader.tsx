import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Menu, Search, User, Heart, ShoppingCart } from 'lucide-react';
import { detectBot } from '@/utils/botDetector';
import { useExtendedLogBotDetection } from '@/utils/useExtendedLogBotDetection';

const HoneypotHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const extendedLogBotDetection = useExtendedLogBotDetection();
  const [searchParams] = useSearchParams();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/honeypot?search=${encodeURIComponent(searchQuery)}&page=1`);
    const botDetection = detectBot();
    extendedLogBotDetection(botDetection, "search_submit");
  };

  return (
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
  );
};

export default HoneypotHeader;
