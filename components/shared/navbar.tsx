'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles, Home, FolderGit2, User, Mail } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Projects', href: '/projects', icon: FolderGit2 },
  { name: 'About', href: '/about', icon: User },
  { name: 'Contact', href: '/contact', icon: Mail },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-500',
          scrolled 
            ? 'bg-background/80 backdrop-blur-xl border-b shadow-lg' 
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="group relative flex items-center gap-2"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-500" />
                <Sparkles className="relative h-6 w-6 text-purple-500 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                {siteConfig.name}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={cn(
                      'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                      'hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10',
                      isActive 
                        ? 'text-primary bg-gradient-to-r from-purple-500/10 to-blue-500/10' 
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className={cn(
                        'h-4 w-4 transition-transform duration-300',
                        isActive ? 'text-purple-500' : 'group-hover:scale-110'
                      )} />
                      {item.name}
                    </span>
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                    )}
                    
                    {/* Hover Effect */}
                    <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500/5 to-blue-500/5" />
                  </Link>
                );
              })}
              
              {/* CTA Button */}
              <Link href="/contact">
                <button className="ml-4 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
                  Get in Touch
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 transition-all duration-300"
            >
              {isOpen ? (
                <X className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5" />
              ) : (
                <Menu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'md:hidden fixed inset-x-0 top-16 bg-background/95 backdrop-blur-xl border-b transition-all duration-500 ease-in-out overflow-hidden',
            isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300',
                    isActive 
                      ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-primary' 
                      : 'hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 text-muted-foreground'
                  )}
                >
                  <Icon className={cn(
                    'h-5 w-5 transition-transform',
                    isActive ? 'text-purple-500' : 'group-hover:scale-110'
                  )} />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <span className="ml-auto w-1 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                  )}
                </Link>
              );
            })}
            <div className="pt-4">
              <Link href="/contact">
                <button className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:shadow-lg transition-all duration-300">
                  Get in Touch
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under navbar */}
      <div className="h-16" />
    </>
  );
}