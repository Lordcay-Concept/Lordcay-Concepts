import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/button'
import { Skills } from '@/components/sections/Skills'
import { ProjectsShowcase } from '@/components/sections/ProjectsShowcase'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[calc(50vh-4rem)] pt-10 mt-10 flex items-center justify-center">
        <div className="container px-4 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="gradient-text">{siteConfig.author.name}</span>
          </h1>
          <p className="text-1xl sm:text-2xl md:text-3xl lg:text-4xl mt-4  text-blue-600">
            {siteConfig.author.developer}
          </p>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground">
            {siteConfig.author.role}
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            {siteConfig.author.bio}
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button asChild>
              <a href="/projects">View Projects</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/contact">Contact Me</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <Skills />

      {/* Projects Section */}
      {/* <ProjectsShowcase /> */}
    </>
  )
}