import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { cn } from '@/lib/utils';

const ResponsiveNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  // Function to get the actual theme (handles system theme)
  const getActualTheme = () => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  };

  const actualTheme = getActualTheme();

  return (
    <nav className={cn("shadow-lg border-b", {
      "bg-white border-gray-200": actualTheme === "light",
      "bg-gray-900 border-gray-700": actualTheme === "dark",
    })}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className={cn("text-2xl font-bold text-blue-600", {
              "text-blue-400": actualTheme === "dark"
            })}>
              YourLogo
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn("px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200", {
                    "text-gray-700 hover:text-blue-600": actualTheme === "light",
                    "text-gray-300 hover:text-blue-400": actualTheme === "dark"
                  })}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <ModeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <div>
              <ModeToggle />
            </div>
            <button
              onClick={toggleMenu}
              className={cn("inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset transition-colors duration-200", {
                "bg-white text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:ring-blue-500": actualTheme === "light",
                "bg-gray-800 text-gray-300 hover:text-blue-400 hover:bg-gray-700 focus:ring-blue-400": actualTheme === "dark"
              })}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className={cn("px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t", {
            "bg-white border-gray-200": actualTheme === "light",
            "bg-gray-900 border-gray-700": actualTheme === "dark"
          })}>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn("block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200", {
                  "text-gray-700 hover:text-blue-600": actualTheme === "light",
                  "text-gray-300 hover:text-blue-400": actualTheme === "dark"
                })}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default ResponsiveNavbar;