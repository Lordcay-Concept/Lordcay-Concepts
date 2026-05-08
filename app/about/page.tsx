'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Code, Users, Award, Coffee, Rocket, Heart, Zap, Globe } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            About <span className="gradient-text">Me</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know me, my journey, and what drives me to create amazing digital experiences
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="animate-fade-left">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-xl opacity-20" />
              <div className="relative bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="text-8xl mb-6 animate-float">👨‍💻</div>
                <h2 className="text-2xl font-bold mb-4">Who Am I?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I'm {siteConfig.author.name}, a passionate {siteConfig.author.role} with over 5 years of experience 
                  building innovative digital solutions. My journey in tech started with a curiosity about how websites 
                  work, and that curiosity has driven me to master full-stack development, AI integration, and mobile 
                  application development.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I believe in writing clean, maintainable code and creating user experiences that are not just 
                  functional but delightful. When I'm not coding, I'm exploring new technologies, contributing to 
                  open source, or mentoring aspiring developers.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 animate-fade-right">
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">My Journey</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                  <p className="text-muted-foreground">Started coding in 2020 with JavaScript and React</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                  <p className="text-muted-foreground">Built my first test full-stack application in 2021</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                  <p className="text-muted-foreground">Explored AI and machine learning integration in 2021</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                  <p className="text-muted-foreground">Got my first job as a developer in 2022</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                  <p className="text-muted-foreground">Developed fintech solutions and mobile apps in 2022-2024</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                  <p className="text-muted-foreground">Currently building enterprise-level solutions and mentoring</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">Mission & Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                My mission is to leverage technology to solve real-world problems and create positive impact. 
                I envision a future where technology is accessible, intuitive, and empowers people to achieve more.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 animate-fade-in">My Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-up">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Clean Code</h3>
                <p className="text-sm text-muted-foreground">Writing maintainable, scalable, and readable solutions</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-up animation-delay-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Collaboration</h3>
                <p className="text-sm text-muted-foreground">Working together to achieve exceptional results</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-up animation-delay-400">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">Embracing new technologies and creative approaches</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-up animation-delay-600">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Passion</h3>
                <p className="text-sm text-muted-foreground">Loving what I do and doing it with excellence</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in">
          <Card className="gradient-bg text-white overflow-hidden relative">
            <CardContent className="pt-12 pb-12">
              <h2 className="text-2xl font-bold mb-4">Let's Work Together</h2>
              <p className="mb-6 opacity-90 max-w-md mx-auto">
                Have a project in mind? Let's collaborate and bring your ideas to life.
              </p>
              <Button size="lg" variant="secondary" asChild className="hover:scale-105 transition-transform">
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}