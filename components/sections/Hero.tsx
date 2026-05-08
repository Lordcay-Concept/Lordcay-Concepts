'use client';

import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import Link from 'next/link';
import { Mail, ArrowRight, Code2, Layout, Database, Cloud, Smartphone, Sparkles } from 'lucide-react';
import { SiGithub, SiX } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';

const quickSkills = [
  { name: "React", icon: <Code2 className="h-3 w-3" /> },
  { name: "Next.js", icon: <Code2 className="h-3 w-3" /> },
  { name: "TypeScript", icon: <Code2 className="h-3 w-3" /> },
  { name: "Tailwind", icon: <Layout className="h-3 w-3" /> },
  { name: "MongoDB", icon: <Database className="h-3 w-3" /> },
  { name: "Node.js", icon: <Cloud className="h-3 w-3" /> },
  { name: "React Native", icon: <Smartphone className="h-3 w-3" /> },
  { name: "Express", icon: <Cloud className="h-3 w-3" /> },
];

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-12">
      {/* Simple Background - Lightweight */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
      </div>

      <div className="container px-4 text-center relative z-10">
        {/* Name with subtle gradient */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="gradient-text">{siteConfig.author.name}</span>
          </h1>
          
          <p className="mt-3 text-base text-muted-foreground sm:text-lg animate-fade-in animation-delay-200">
            {siteConfig.author.role}
          </p>
          
          <p className="mt-4 max-w-2xl mx-auto text-sm text-muted-foreground sm:text-base animate-fade-in animation-delay-400 px-4">
            Building innovative solutions for web, mobile, and AI applications with cutting-edge technology.
          </p>
        </div>

        {/* Quick Skills Row - Horizontal scroll on mobile, wrap on desktop */}
        <div className="mt-8 animate-fade-in animation-delay-600">
          <div className="flex flex-wrap justify-center gap-2">
            {quickSkills.map((skill, index) => (
              <span
                key={skill.name}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 transition-all hover:scale-105"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {skill.icon}
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center animate-fade-in animation-delay-800">
          <Button size="default" className="gradient-bg hover:scale-105 transition-transform text-sm sm:text-base" asChild>
            <Link href="/projects">
              View My Work <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
          </Button>
          <Button size="default" variant="outline" className="hover:scale-105 transition-transform text-sm sm:text-base" asChild>
            <Link href="/contact">
              <Mail className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Contact Me
            </Link>
          </Button>
        </div>

        {/* Social Links */}
        <div className="mt-10 flex justify-center gap-5 animate-fade-in animation-delay-1000">
          <Link href={siteConfig.social.github} target="_blank" className="text-muted-foreground hover:text-primary transition-all hover:scale-110 duration-300">
            <SiGithub className="h-5 w-5 sm:h-6 sm:w-6" />
          </Link>
          <Link href={siteConfig.social.x} target="_blank" className="text-muted-foreground hover:text-primary transition-all hover:scale-110 duration-300">
            <SiX className="h-5 w-5 sm:h-6 sm:w-6" />
          </Link>
          <Link href={siteConfig.social.linkedin} target="_blank" className="text-muted-foreground hover:text-primary transition-all hover:scale-110 duration-300">
            <FaLinkedin className="h-5 w-5 sm:h-6 sm:w-6" />
          </Link>
          <Link href={`mailto:${siteConfig.author.email}`} className="text-muted-foreground hover:text-primary transition-all hover:scale-110 duration-300">
            <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
          </Link>
        </div>
      </div>
    </section>
  );
}