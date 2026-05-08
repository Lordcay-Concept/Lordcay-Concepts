'use client';

import Link from 'next/link';
import { SiGithub, SiX } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold gradient-text">{siteConfig.name}</h3>
            <p className="text-sm text-muted-foreground">
              Building innovative solutions for web, mobile, and AI applications.
            </p>
            <div className="flex space-x-4">
              <Link href={siteConfig.social.github} target="_blank" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
                <SiGithub className="h-5 w-5" />
              </Link>
              <Link href={siteConfig.social.x} target="_blank" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
                <SiX className="h-5 w-5" />
              </Link>
              <Link href={siteConfig.social.linkedin} target="_blank" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
                <FaLinkedin className="h-5 w-5" />
              </Link>
              <Link href={`mailto:${siteConfig.author.email}`} className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Projects</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/projects?category=E-commerce" className="hover:text-primary transition-colors">E-Commerce</Link></li>
              <li><Link href="/projects?category=AI" className="hover:text-primary transition-colors">AI Solutions</Link></li>
              <li><Link href="/projects?category=Fintech" className="hover:text-primary transition-colors">Fintech</Link></li>
              <li><Link href="/projects?category=Mobile" className="hover:text-primary transition-colors">Mobile Apps</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Admin</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/admin/login" className="hover:text-primary transition-colors">Admin Login</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}