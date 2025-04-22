import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HoneypotFooter = () => {
  return (
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
  );
};

export default HoneypotFooter;
