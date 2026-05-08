'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, ShoppingCart, Brain, Calendar, School, Banknote, Smartphone } from 'lucide-react'
import Link from 'next/link'
import { SiGithub, } from '@icons-pack/react-simple-icons';

const projects = [
  {
    title: "Ikan Online Store",
    description: "Full-featured e-commerce platform with product management, cart, checkout, and payment integration.",
    technologies: ["JavaScript", "Node.Js", "MongoDB", "Paystack", "Chakra UI"],
    liveUrl: "https://ikan-online-store.vercel.app",
    githubUrl: "https://github.com/Lordcay-Concept",
    featured: false,
    icon: ShoppingCart,
    category: "E-commerce"
  },
  {
    title: "Research Hub",
    description: "AI-powered research platform with intelligent search, content generation, and academic analysis tools.",
    technologies: ["JavaScript", "Grok", "Chakra UI", "TensorFlow", "Node.js", "MongoDB"],
    liveUrl: "https://research-hub-space.vercel.app",
    githubUrl: "https://github.com/Lordcay-Concept",
    featured: false,
    icon: Brain,
    category: "AI"
  },
  {
    title: "A&Q Master Pro",
    description: "Comprehensive appointment and queue management system with real-time updates, SMS notifications, and analytics.",
    technologies: ["React", "TypeScript", "TailwindCSS + ShadCN", "Node.js", "Socket.io", "MongoDB", "Twilio", "NextAuth"],
    liveUrl: "https://aqmasterpro.vercel.app",
    githubUrl: "https://github.com/Lordcay-Concept",
    featured: false,
    icon: Calendar,
    category: "Enterprise"
  },
  {
    title: "Possible Height School",
    description: "Complete school management system with student records, grading, attendance, fees, and parent portal.",
    technologies: ["Next.js", "PostgreSQL", "Supabase", "TailwindCSS + ShadCN", "NextAuth", "Node.js", "TypeScript"],
    liveUrl: "https://possibleheightschools.vercel.app",
    githubUrl: "https://github.com/Lordcay-Concept",
    featured: false,
    icon: School,
    category: "Education"
  },
  {
    title: "BonaPay Web",
    description: "Secure fintech web platform for payments, transfers, bill payments, and financial management.",
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "TailwindCSS + ShadCN", "NextAuth", "Node.js", "Twilio"],
    liveUrl: "https://bonapay.vercel.app",
    githubUrl: "https://github.com/Lordcay-Concept",
    featured: false,
    icon: Banknote,
    category: "Fintech"
  },
  {
    title: "BonaPay App",
    description: "Mobile fintech application with biometric authentication, QR payments, and real-time transaction tracking.",
    technologies: ["React Native", "Expo", "Node.js", "Supabase", "Firebase", "TypeScript", "Twilio", "TailwindCSS + ShadCN", "NextAuth"],
    liveUrl: "https://github.com/Lordcay-Concept/bonapay-app/releases/tag/v1.0.0",
    githubUrl: "https://github.com/Lordcay-Concept",
    featured: false,
    icon: Smartphone,
    category: "Mobile"
  },
]

export function ProjectsShowcase() {
  const featuredProjects = projects.filter(p => p.featured)

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Some of my best work across e-commerce, AI, fintech, and enterprise solutions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => {
            const Icon = project.icon
            return (
              <Card key={index} className="overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <Badge variant="outline">{project.category}</Badge>
                  </div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary">+{project.technologies.length - 3}</Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button size="sm" asChild>
                    <Link href={project.liveUrl} target="_blank">
                      Live Demo <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={project.githubUrl} target="_blank">
                      Code <SiGithub className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" asChild>
            <Link href="/projects">View All Projects (6+) →</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}