import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Shield, Users, Vote, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/ver-ideas', label: 'Ver Ideas', icon: Users },
    { path: '/votar-ideas', label: 'Votar Ideas', icon: Vote }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 z-10">
            <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/47a01f6b-06ce-4940-b2fb-2d51ed4738e6/1663bdaf7fc513b25daeaefa9813817a.png" alt="CACO&POLA Logo" className="h-12 w-auto" />
          </Link>

          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
            <motion.h1 
              className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-wide"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              CACO&POLA
            </motion.h1>
          </Link>

          <div className="flex items-center space-x-2 z-10">
            <nav className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-gray-700 text-base font-semibold hover:text-blue-500 transition-colors duration-300 px-3 py-2 rounded-lg ${
                    location.pathname === item.path ? 'bg-black/5 text-blue-600' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
               <Link to="/admin" className="text-gray-700 hover:text-blue-500 transition-colors duration-300 p-2 rounded-full hover:bg-black/5">
                <Shield className="h-6 w-6" />
              </Link>
            </nav>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-800 hover:bg-black/5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pt-4 border-t border-black/10"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-gray-800 hover:bg-black/5 rounded-lg transition-all duration-300 font-semibold text-lg py-3 px-4 flex items-center space-x-3 ${
                    location.pathname === item.path ? 'bg-black/10 text-blue-600' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
               <Link
                to="/admin"
                className="text-gray-800 hover:bg-black/5 rounded-lg transition-all duration-300 font-semibold text-lg py-3 px-4 flex items-center space-x-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield className="h-5 w-5" />
                <span>Admin</span>
              </Link>
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
};

export default Header;